import Instance from 'common/instances/instance';
import Version from 'common/versions/version';
import { IpcMain } from 'electron';
import { readFileSync, writeFileSync } from 'jsonfile';
import path from 'path';
import Logger from './logger';
import IconsProvider from './providers/icons.provider';
import InstanceProvider from './providers/instance.provider';
import LauncherProvider from './providers/launcher.provider';
import VersionsProvider from './providers/versions.provider';
import { getSafeLauncherDir } from './utils/dir.utils';

export default class Manager {
  private readonly icons: IconsProvider;
  private readonly instances: InstanceProvider;
  private readonly launcher: LauncherProvider;
  private readonly versions: VersionsProvider;

  constructor() {
    this.icons = new IconsProvider();
    this.instances = new InstanceProvider();
    this.launcher = new LauncherProvider();
    this.versions = new VersionsProvider(this.launcher);
  }

  registerIPC(ipc: IpcMain) {
    ipc.on('icons:list', async (event) => {
      Logger.debug(`Renderer call IPC function "icons:list"`);
      const icons = await this.icons
        .listIcons()
        .catch((e) => Logger.crit(e.toString()));
      event.sender.send('icons:list', icons);
    });

    ipc.on('instances:create', async (event, args) => {
      Logger.debug(`Renderer call IPC function "instances:create"`);
      const instance = args[0] as Instance;
      const savedInstance = await this.instances
        .createInstance(instance)
        .catch((e) => Logger.crit(e.toString()));
      event.sender.send('instances:create', savedInstance);
    });

    ipc.on('instances:get_metadata', async (event, args) => {
      Logger.debug(`Renderer call IPC function "instances:get_metadata"`);
      const name = args[0] as string;
      const metadata = await this.instances
        .getInstanceMetadata(name)
        .catch((e) => Logger.crit(e.toString()));
      event.sender.send('instances:get_metadata', metadata);
    });

    ipc.on('instances:list', async (event) => {
      Logger.debug(`Renderer call IPC function "instances:list"`);
      const instances = await this.instances
        .listInstances()
        .catch((e) => Logger.crit(e.toString()));
      event.sender.send('instances:list', instances);
    });

    ipc.on('launcher:launch', async (event, args) => {
      Logger.debug(`Renderer call IPC function "launcher:launch"`);
      const instance = args[0] as Instance;
      const version = args[1] as Version;
      const launcher = this.launcher.instantiate(instance, version);

      launcher.prepare();
      await launcher.start();
      event.sender.send('launcher:launch', null);
    });

    ipc.on('ram:modify', async (event, args) => {
      // Logger.debug(`Renderer call IPC function "ram:modify"`);
      const minValue = args[0] as number;
      const maxValue = args[1] as number;

      const configFile = path.join(getSafeLauncherDir(), 'config.json');
      const values = readFileSync(configFile);
      
      values.minRam = minValue >= 1024 ? minValue : 1024;
      values.maxRam = maxValue >= 2048 ? maxValue : 2048;

      writeFileSync(configFile, values);
    });

    ipc.on('ram:read', async (event) => {
      // Logger.debug(`Renderer call IPC function "ram:read"`);

      const configFile = path.join(getSafeLauncherDir(), 'config.json');
      const values = readFileSync(configFile);

      const minRam: number = values.minRam >= 1024 ? values.minRam : 1024;
      const maxRam: number = values.maxRam >= 2048 ? values.maxRam : 2048;

      event.sender.send('ram:read', [minRam, maxRam]);
    });

    ipc.on('username:modify', async (event, args) => {
      // Logger.debug(`Renderer call IPC function "username:modify"`);

      const username = args[0] as string;

      const configFile = path.join(getSafeLauncherDir(), 'config.json');
      const values = readFileSync(configFile);

      values.username = username.length >= 3 ? username : "Steve";

      writeFileSync(configFile, values);

      event.sender.send('username:modify');
    });

    ipc.on('username:read', async (event) => {
      // Logger.debug(`Renderer call IPC function "username:read"`);

      const configFile = path.join(getSafeLauncherDir(), 'config.json');

      const values = await readFileSync(configFile);
      const username: string = values.username.length >= 3 ? values.username : "Steve";

      event.sender.send('username:read', username);
    });

    ipc.on('versions:download', async (event, args) => {
      Logger.debug(`Renderer call IPC function "versions:download"`);
      const version = args[0] as Version;
      const launcher = this.launcher.instantiate(null, version as Version);

      launcher.on('download_start', (e) => {
        event.sender.send('versions:download_start', e);
      });

      launcher.on('download_progress', (e) => {
        event.sender.send('versions:download_progress', e);
      });

      launcher.on('download_end', (e) => {
        event.sender.send('versions:download_end', e);
      });

      launcher.prepare();
      await launcher.download().catch((e) => {
        event.sender.send('versions:download_end', { error: e });
      });
      version.status = 'ready';
      event.sender.send('versions:download', version);
    });

    ipc.on('versions:download_manifest', async (event, args) => {
      Logger.debug(`Renderer call IPC function "versions:download_manifest"`);
      const url = args[0] as string;
      const version = await this.versions
        .downloadManifest(url)
        .catch((e) => Logger.crit(e.toString()));
      event.sender.send('versions:download_manifest', version?.manifest);
    });

    ipc.on('versions:list', async (event) => {
      Logger.debug(`Renderer call IPC function "versions:list"`);
      const versions = await this.versions
        .listVersions()
        .catch((e) => Logger.crit(e.toString()));
      event.sender.send('versions:list', versions);
    });
  }
}
