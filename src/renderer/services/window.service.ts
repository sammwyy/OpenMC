export function closeWindow() {
  window.electron.ipcRenderer.sendMessage('window:close', []);
}

export function maximizeWindow() {
  window.electron.ipcRenderer.sendMessage('window:maximize', []);
}

export function minimizeWindow() {
  window.electron.ipcRenderer.sendMessage('window:minimize', []);
}
