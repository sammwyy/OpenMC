import Instance from 'common/instances/instance';
import Version from 'common/versions/version';
import { IpcMain } from 'electron';
import Logger from './logger';
import ConfigProvider from './providers/config.provider';
import IconsProvider from './providers/icons.provider';
import InstanceProvider from './providers/instance.provider';
import LauncherProvider from './providers/launcher.provider';
import VersionsProvider from './providers/versions.provider';
import {saveConfig} from './providers/launcher.provider';


export default class Manager {
  private readonly config: ConfigProvider;
  private readonly icons: IconsProvider;
  private readonly instances: InstanceProvider;
  private readonly launcher: LauncherProvider;
  private readonly versions: VersionsProvider;

  constructor() {
    this.config = new ConfigProvider();
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
      saveConfig();
      const instance = args[0] as Instance;
      const version = args[1] as Version;
      const launcher = this.launcher.instantiate(instance, version);

      launcher.prepare();
      await launcher.start();
      event.sender.send('launcher:launch', null);
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

    ipc.on('config:read', async (event) => {
      const config = await this.config
      .loadConfig()
      .catch((e) => Logger.crit(e.toString()));
      event.sender.send('config:read', config);
    });

      // Change RAM parameters
    ipc.on('config:save', (event, args) => {
      const minRamValue = args[0];
      const maxRamValue = args[1];
      const username = args[2];
      
      new ConfigProvider().saveConfig(minRamValue, maxRamValue, username);
    });
  }
}
