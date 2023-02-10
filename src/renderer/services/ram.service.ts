// Send the RAM values to main
export function adjustRam(minvalue: string, maxvalue: string, size: number) {
    window.electron.ipcRenderer.sendMessage('config:write', [
        minvalue,
        maxvalue,
        size
    ]);
}
