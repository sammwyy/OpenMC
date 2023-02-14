import { Config } from 'common/config/config-metadata';

// Send the RAM values to main
export function saveConfig(minRamValue: number, maxRamRalue: number, username: string) {
    window.electron.ipcRenderer.sendMessage('config:save', [
        minRamValue,
        maxRamRalue,
        username
    ]);
}

export function getConfig() {
    return new Promise((resolve) => {
      window.electron.ipcRenderer.once('config:read', (packet) => {
        const result = packet as Config;
        resolve(result);
      });
  
      window.electron.ipcRenderer.sendMessage('config:read', []);
    });
  }