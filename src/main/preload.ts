import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'app:log'
  | 'icons:list'
  | 'instances:create'
  | 'instances:get_metadata'
  | 'instances:list'
  | 'launcher:launch'
  | 'versions:download'
  | 'versions:download_start'
  | 'versions:download_progress'
  | 'versions:download_end'
  | 'versions:download_manifest'
  | 'versions:list'
  | 'window:close'
  | 'window:minimize'
  | 'config:read'
  | 'config:write'
  | 'user:write'
  | 'window:maximize';

type RemoveFnCallback = () => void;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(
      channel: Channels,
      func: (...args: unknown[]) => void
    ): RemoveFnCallback {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
