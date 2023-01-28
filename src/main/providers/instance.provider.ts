import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

import Instance from '../../common/instances/instance';
import InstanceSettings from '../../common/instances/instance-settings';
import InstanceMetadata from '../../common/instances/instance-metadata';
import { getSafeLauncherDir } from '../utils/dir.utils';
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
    launching: false,
  };
}

export default class InstanceProvider {
  private instancesDir: string;

  constructor() {
    this.instancesDir = getSafeLauncherDir('instances');
  }

  async createInstance(instance: Instance): Promise<Instance> {
    const dir = path.join(this.instancesDir, instance.name);
    await fs.mkdir(dir, { recursive: true });

    const configFile = path.join(dir, 'instance.json');
    const rawConfig = JSON.stringify(instance.settings);
    await fs.writeFile(configFile, rawConfig, { encoding: 'utf-8' });

    const iconFile = path.join(dir, 'icon.png');
    const b64data = instance.icon.replace(/^data:image\/png;base64,/, '');
    await fs.writeFile(iconFile, b64data, { encoding: 'base64' });

    return instance;
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

  async getInstanceMetadata(name: string): Promise<InstanceMetadata | null> {
    const instancePath = path.join(this.instancesDir, name);
    const mcDirPath = path.join(instancePath, '.minecraft');

    if (!fsSync.existsSync(instancePath)) {
      return null;
    }

    const modsDir = path.join(mcDirPath, 'mods');
    const rpDir = path.join(mcDirPath, 'resourcepacks');
    const spDir = path.join(mcDirPath, 'shaderpacks');
    const worldsDir = path.join(mcDirPath, 'saves');

    await fs.mkdir(mcDirPath, { recursive: true });
    await fs.mkdir(modsDir, { recursive: true });
    await fs.mkdir(rpDir, { recursive: true });
    await fs.mkdir(spDir, { recursive: true });
    await fs.mkdir(worldsDir, { recursive: true });

    const mods = await fs.readdir(modsDir, { withFileTypes: true });
    const resourcepacks = await fs.readdir(modsDir, { withFileTypes: true });
    const shaderpacks = await fs.readdir(rpDir, { withFileTypes: true });
    const worlds = await fs.readdir(worldsDir, { withFileTypes: true });

    return {
      mods: mods
        .filter(
          (v) =>
            (v.isFile() && v.name.endsWith('.jar')) ||
            v.name.endsWith('.jar.disabled')
        )
        .map((f) => ({
          name: f.name,
          enabled: f.name.endsWith('.jar'),
        })),
      resourcepacks: resourcepacks
        .filter((f) => f.isDirectory() || f.name.endsWith('.zip'))
        .map((f) => f.name),
      shaderpacks: shaderpacks
        .filter((f) => f.isFile() && f.name.endsWith('.zip'))
        .map((f) => f.name),
      worlds: worlds.filter((f) => f.isDirectory()).map((f) => f.name),
    };
  }
}
