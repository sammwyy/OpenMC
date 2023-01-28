import Instance from 'common/instances/instance';
import Version from 'common/versions/version';

export function launchInstance(instance: Instance, version: Version) {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('launcher:launch', () => {
      resolve(null);
    });

    window.electron.ipcRenderer.sendMessage('launcher:launch', [
      instance,
      version,
    ]);
  });
}

export function dummy() {}
