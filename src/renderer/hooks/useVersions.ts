import { useContext } from 'react';
import VersionsContext from 'renderer/contexts/versions/versions-context';

const useVersions = () => useContext(VersionsContext);

export default useVersions;
