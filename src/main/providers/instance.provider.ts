import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

import Instance from '../../common/instances/instance';
import InstanceSettings from '../../common/instances/instance-settings';
import { getSafeLauncherFile } from '../utils/dir.utils';
import { imageToBase64 } from '../utils/file.utils';

async function loadInstance(instanceDir: string): Promise<Instance> {
  // Get name.
  const name = path.basename(instanceDir);

  // Load settings.
  const settingsFile = path.join(instanceDir, 'instance.json');
  const rawSettings = await fs.readFile(settingsFile, { encoding: 'utf-8' });
  const settings: InstanceSettings = JSON.parse(rawSettings);

  // Load icon.
  const iconFile = path.join(instanceDir, 'icon.png');
  const icon = await imageToBase64(iconFile);

  return {
    name,
    icon,
    settings,
  };
}

export default class InstanceProvider {
  private instancesDir: string;

  constructor() {
    this.instancesDir = getSafeLauncherFile('instances');
  }

  async listInstances() {
    const instances = [];
    const files = await fs.readdir(this.instancesDir);

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const instanceDir = path.join(this.instancesDir, file);
      const exist = fsSync.existsSync(path.join(instanceDir, 'instance.json'));

      if (exist) {
        const instance = await loadInstance(instanceDir);
        instances.push(instance);
      }
    }
    return instances;
  }
}
