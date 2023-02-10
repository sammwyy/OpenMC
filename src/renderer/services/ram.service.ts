// Send the RAM values to main
export function adjustRam(minvalue: string, maxvalue: string, size: number) {
    window.electron.ipcRenderer.sendMessage('config:write', [
        minvalue,
        maxvalue,
        size
    ]);
}

// Get the RAM values to renderer
export function getRam(minvalue: string, maxvalue: string, size: number) {
    window.electron.ipcRenderer.sendMessage('config:read', [
        minvalue,
        maxvalue,
        size
    ]);
}