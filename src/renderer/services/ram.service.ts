export function modifyRam(
  minValue: number,
  maxValue: number
): Promise<number[]> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('ram:modify', (packet) => {
      const result = packet as number[];
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('ram:modify', [minValue, maxValue]);
  });
}

export function readRam(): Promise<number[]> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('ram:read', (packet) => {
      const result = packet as number[];
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('ram:read', []);
  });
}
