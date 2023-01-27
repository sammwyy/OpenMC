import { IpcMain } from 'electron';
import InstanceProvider from './providers/instance.provider';

export default class Manager {
  private readonly instances: InstanceProvider;

  constructor() {
    this.instances = new InstanceProvider();
  }

  registerIPC(ipc: IpcMain) {
    ipc.on('instances:list', async (event) => {
      const instances = await this.instances.listInstances();
      event.sender.send('instances:list', instances);
    });
  }
}
