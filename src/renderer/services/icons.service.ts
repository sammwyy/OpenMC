export function listIcons(): Promise<string[]> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('icons:list', (packet) => {
      const result = packet as string[];
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('icons:list', []);
  });
}

export function saveIcon() {}
