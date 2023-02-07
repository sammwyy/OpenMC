import Version from 'common/versions/version';
import Download from './download';

export default interface DownloadHook {
  download: Download | null;
  versionDownloading: Version | null;
  downloadVersion: (version: Version) => void;
}
