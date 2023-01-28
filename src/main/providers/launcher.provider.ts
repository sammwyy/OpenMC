import path from 'path';
import { Authenticator, Client } from 'minecraft-launcher-core';

import Instance from 'common/instances/instance';
import Version from 'common/versions/version';
import { getSafeLauncherDir } from '../utils/dir.utils';

export default class LauncherProvider {
  private assetsDir: string;
  private instancesDir: string;
  private librariesDir: string;
  private versionsDir: string;

  constructor() {
    this.assetsDir = getSafeLauncherDir('assets');
    this.instancesDir = getSafeLauncherDir('instances');
    this.librariesDir = getSafeLauncherDir('libraries');
    this.versionsDir = getSafeLauncherDir('versions');
  }

  launch(instance: Instance, version: Version): Promise<void> {
    return new Promise((resolve, reject) => {
      const mcDir = path.join(this.instancesDir, instance.name, '.minecraft');
      const verDir = path.join(this.versionsDir, version.name);

      const launcher = new Client();
      launcher.launch({
        authorization: Authenticator.getAuth('Player'),
        root: mcDir,
        version: {
          number: version.name,
          type: version.manifest?.type === 'snapshot' ? 'snapshot' : 'release',
        },
        memory: {
          min: 1024,
          max: 2048,
        },
        overrides: {
          assetRoot: this.assetsDir,
          libraryRoot: this.librariesDir,
          minecraftJar: path.join(verDir, `${version.name}.jar`),
          versionJson: path.join(verDir, `${version.name}.json`),
          cwd: mcDir,
        },
      });

      let firstData = true;

      launcher.on('debug', (e) => console.log(e));

      launcher.on('data', (e) => {
        if (firstData) {
          resolve();
        }

        console.log(e);
        firstData = false;
      });
    });
  }
}
