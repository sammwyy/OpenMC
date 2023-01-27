import { IpcMain } from 'electron';
import IconsProvider from './providers/icons.provider';
import InstanceProvider from './providers/instance.provider';

export default class Manager {
  private readonly icons: IconsProvider;
  private readonly instances: InstanceProvider;

  constructor() {
    this.icons = new IconsProvider();
    this.instances = new InstanceProvider();
  }

  registerIPC(ipc: IpcMain) {
    ipc.on('icons:list', async (event) => {
      const icons = await this.icons.listIcons();
      event.sender.send('icons:list', icons);
    });

    ipc.on('instances:list', async (event) => {
      const instances = await this.instances.listInstances();
      event.sender.send('instances:list', instances);
    });
  }
}
