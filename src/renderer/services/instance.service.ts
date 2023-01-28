import Instance from 'common/instances/instance';

export function listInstances(): Promise<Instance[]> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('instances:list', (packet) => {
      const result = packet as Instance[];
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('instances:list', []);
  });
}

export function createInstance(instance: Instance): Promise<Instance> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('instances:create', (packet) => {
      const result = packet as Instance;
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('instances:create', [instance]);
  });
}
