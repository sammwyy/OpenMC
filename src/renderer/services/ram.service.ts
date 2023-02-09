export function adjustRam(minvalue: string, maxvalue: string) {
    window.electron.ipcRenderer.sendMessage('config:write', [
        minvalue,
        maxvalue
    ]);
}