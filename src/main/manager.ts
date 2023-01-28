import Instance from 'common/instances/instance';
import { IpcMain } from 'electron';
import IconsProvider from './providers/icons.provider';
import InstanceProvider from './providers/instance.provider';
import VersionsProvider from './providers/versions.provider';

export default class Manager {
  private readonly icons: IconsProvider;
  private readonly instances: InstanceProvider;
  private readonly versions: VersionsProvider;

  constructor() {
    this.icons = new IconsProvider();
    this.instances = new InstanceProvider();
    this.versions = new VersionsProvider();
  }

  registerIPC(ipc: IpcMain) {
    ipc.on('icons:list', async (event) => {
      const icons = await this.icons.listIcons();
      event.sender.send('icons:list', icons);
    });

    ipc.on('instances:create', async (event, args) => {
      const instance = args[0] as Instance;
      await this.instances.createInstance(instance);
    });

    ipc.on('instances:list', async (event) => {
      const instances = await this.instances.listInstances();
      event.sender.send('instances:list', instances);
    });

    ipc.on('versions:download_manifest', async (event, args) => {
      const url = args[0] as string;
      const version = await this.versions.downloadManifest(url);
      event.sender.send('versions:download_manifest', version.manifest);
    });

    ipc.on('versions:list', async (event) => {
      const versions = await this.versions.listVersions();
      event.sender.send('versions:list', versions);
    });
  }
}
