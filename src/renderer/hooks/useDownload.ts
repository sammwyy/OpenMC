import { useContext } from 'react';
import DownloadContext from 'renderer/contexts/download/download-context';

const useDownload = () => useContext(DownloadContext);

export default useDownload;
