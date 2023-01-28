import Instance from 'common/instances/instance';
import InstanceMetadata from 'common/instances/instance-metadata';

export function createInstance(instance: Instance): Promise<Instance> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('instances:create', (packet) => {
      const result = packet as Instance;
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('instances:create', [instance]);
  });
}

export function getInstanceMetadata(name: string): Promise<InstanceMetadata> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('instances:get_metadata', (packet) => {
      const result = packet as InstanceMetadata;
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('instances:get_metadata', [name]);
  });
}

export function listInstances(): Promise<Instance[]> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('instances:list', (packet) => {
      const result = packet as Instance[];
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('instances:list', []);
  });
}
