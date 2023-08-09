import Settings from 'common/settings';

export function loadSettings(): Promise<Settings> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('settings:load', (settings: unknown) => {
      resolve(settings as Settings);
    });

    window.electron.ipcRenderer.sendMessage('settings:load', []);
  });
}

export function saveSettings(settingstoSave: Settings): Promise<Settings> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('settings:save', (settings: unknown) => {
      resolve(settings as Settings);
    });

    window.electron.ipcRenderer.sendMessage('settings:save', [settingstoSave]);
  });
}
