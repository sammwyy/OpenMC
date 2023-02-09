export function adjustNick(nickname: string) {
    window.electron.ipcRenderer.sendMessage('user:write', [
        nickname
    ]);
}