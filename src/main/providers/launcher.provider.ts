import path from 'path';
import { MinecraftLauncher } from 'minecraft-launcher-js';

import ConfigProvider from './config.provider';
import Instance from 'common/instances/instance';
import Version from 'common/versions/version';
import { getSafeLauncherDir } from '../utils/dir.utils';
import Logger from '../logger';

var minRam = 1024;
var maxRam = 2048;
var username = 'Player';

export function saveConfig() {
  new ConfigProvider().loadConfig().then(function(result) {
    minRam = result.memory.min;
    maxRam = result.memory.max;
    username = result.account.username;
  })
}


export default class LauncherProvider {
  private assetsDir: string;
  private instancesDir: string;
  private librariesDir: string;
  private nativesDir: string;
  private versionsDir: string;

  constructor() {
    this.assetsDir = getSafeLauncherDir('assets');
    this.instancesDir = getSafeLauncherDir('instances');
    this.librariesDir = getSafeLauncherDir('libraries');
    this.nativesDir = getSafeLauncherDir('natives');
    this.versionsDir = getSafeLauncherDir('versions');
  }


  instantiate(instance: Instance | null, version: Version): MinecraftLauncher {
    const mcDir = path.join(
      this.instancesDir,
      instance?.name || 'unknown',
      '.minecraft'
    );

    const launcher = new MinecraftLauncher({
      authentication: {
        name: username,
      },
      gameRoot: mcDir,
      assetsRoot: this.assetsDir,
      libraryRoot: this.librariesDir,
      nativesRoot: this.nativesDir,
      versionRoot: this.versionsDir,
      memory: {
        min: minRam,
        max: maxRam,
      },
      version: {
        number: version.name,
        type: version.manifest?.type === 'snapshot' ? 'snapshot' : 'release',
      },
    });

    launcher.on('stdout', (message) => {
      const e = message as unknown as string;

      const prefix = e.split('[')[2]?.split(']')[0].split('/')[1] || 'INFO';
      if (prefix === 'INFO') {
        Logger.info(`(Client) ${e}`);
      } else if (prefix === 'ERROR') {
        Logger.crit(`(Client) ${e}`);
      } else if (prefix === 'WARN') {
        Logger.warn(`(Client) ${e}`);
      }
    });

    launcher.on('stderr', (message) => {
      const e = message as unknown as string;
      Logger.crit(`(Client) ${e}`);
    });

    return launcher;
  }
}
