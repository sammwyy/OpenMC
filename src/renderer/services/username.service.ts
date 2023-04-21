export function modifyUsername(username: string): Promise<string> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('username:modify', (packet) => {
      const result = packet as string;
      resolve(result);
    });

  window.electron.ipcRenderer.sendMessage('username:modify', [username]);
  });
}

export function readUsername(): Promise<string> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('username:read', (packet) => {
      const result = packet as string;
      resolve(result);
    });

  window.electron.ipcRenderer.sendMessage('username:read', []);
  });
}
