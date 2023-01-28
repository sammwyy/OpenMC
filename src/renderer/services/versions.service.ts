import Version from 'common/versions/version';
import VersionManifest from 'common/versions/version-manifest';

export function listVersions(): Promise<Version[]> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('versions:list', (packet) => {
      const result = packet as Version[];
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('versions:list', []);
  });
}

export function downloadManifestWithUrl(url: string): Promise<VersionManifest> {
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('versions:download_manifest', (packet) => {
      const result = packet as VersionManifest;
      resolve(result);
    });

    window.electron.ipcRenderer.sendMessage('versions:download_manifest', [
      url,
    ]);
  });
}
