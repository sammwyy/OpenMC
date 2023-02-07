import React from 'react';
import VersionsHook from './versions-hook';
import Version, { VersionType } from '../../../common/versions/version';

const VersionsContext = React.createContext<VersionsHook>({
  versions: <Version[]>[],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  downloadManifest: (version: Version): Promise<Version> => {
    return new Promise(() => {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByType: (type: VersionType): Version[] => {
    return [];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByName: (name: string): Version | null => {
    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateVersions: (): Promise<void> => {
    return new Promise(() => {});
  },
});

export default VersionsContext;
