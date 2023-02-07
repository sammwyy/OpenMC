import Version from 'common/versions/version';
import React from 'react';
import DownloadHook from './download-hook';

const DownloadContext = React.createContext<DownloadHook>({
  download: null,
  versionDownloading: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  downloadVersion: (version: Version) => {},
});

export default DownloadContext;
