import Version from 'common/versions/version';
import { DownloadTaskEnd } from 'minecraft-launcher-js';
import { DownloadTaskProgress } from 'minecraft-launcher-js/lib/events/download-task-progress';
import { DownloadTaskStart } from 'minecraft-launcher-js/lib/events/download-task-start';
import { PropsWithChildren, useEffect, useState } from 'react';
import useLogs from 'renderer/hooks/useLogs';
import useVersions from 'renderer/hooks/useVersions';
import Download from './download';
import DownloadContext from './download-context';

export default function DownloadProvider({ children }: PropsWithChildren) {
  const logs = useLogs();
  const { updateVersions } = useVersions();
  const [download, setDownload] = useState<Download | null>(null);
  const [versionDownloading, setVersionDownloading] = useState<Version | null>(
    null
  );

  function downloadVersion(version: Version) {
    const newVersion = { ...version };
    newVersion.status = 'downloading';
    setVersionDownloading(newVersion);
    window.electron.ipcRenderer.sendMessage('versions:download', [version]);
  }

  useEffect(() => {
    const startCB = window.electron.ipcRenderer.on(
      'versions:download_start',
      (arg: unknown) => {
        const e = arg as DownloadTaskStart;
        logs.info(
          `Starting ${e.name} download (${e.files} files, total ${e.totalSize} bytes.)`
        );

        setDownload({
          files: {
            downloaded: 0,
            total: e.files,
          },
          name: e.name,
          percent: 0,
          size: {
            downloaded: 0,
            total: e.totalSize,
          },
        });
      }
    );

    const progressCB = window.electron.ipcRenderer.on(
      'versions:download_progress',
      (arg: unknown) => {
        const e = arg as DownloadTaskProgress;
        if (download) {
          const old = { ...download };
          old.files = {
            downloaded: e.progressFiles,
            total: e.totalFiles,
          };
          old.percent = e.progress;
          old.size = {
            downloaded: e.progressSize,
            total: e.totalSize,
          };

          setDownload(old);
        }
      }
    );

    const endCB = window.electron.ipcRenderer.on(
      'versions:download_end',
      (arg: unknown) => {
        const e = arg as DownloadTaskEnd;
        const newVersion = { ...versionDownloading };

        if (e.error) {
          logs.crit(e.error);
          newVersion.status = 'missing';
        } else {
          logs.info('Download finished.');
          newVersion.status = 'ready';
        }

        setDownload(null);
      }
    );

    const downloadCB = window.electron.ipcRenderer.on(
      'versions:download',
      async () => {
        await updateVersions();
        setVersionDownloading(null);
        setDownload(null);
      }
    );

    return () => {
      startCB();
      endCB();
      progressCB();
      downloadCB();
    };
  }, [download, logs, versionDownloading, updateVersions]);

  return (
    <DownloadContext.Provider
      value={{ download, versionDownloading, downloadVersion }}
    >
      {children}
    </DownloadContext.Provider>
  );
}
