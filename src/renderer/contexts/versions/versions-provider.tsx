import { PropsWithChildren, useEffect, useState } from 'react';

import {
  downloadManifestWithUrl,
  listVersions,
} from '../../services/versions.service';
import Version, { VersionType } from '../../../common/versions/version';
import VersionsContext from './versions-context';

export default function VersionsProvider({ children }: PropsWithChildren) {
  const [versions, setVersions] = useState<Version[]>([]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    listVersions().then(setVersions).catch(console.error);
  }, []);

  async function downloadManifest(version: Version): Promise<Version> {
    const versionWithManifest = await downloadManifestWithUrl(
      version.manifestUrl || ''
    );
    version.manifest = versionWithManifest;
    setVersions([...versions.filter((v) => v !== version), version]);
    return version;
  }

  function getByType(type: VersionType): Version[] {
    return versions.filter((version) => version.type === type);
  }

  function getByName(name: string): Version | null {
    for (let i = 0; i < versions.length; i += 1) {
      const version = versions[i];
      if (version.name === name) {
        return version;
      }
    }

    return null;
  }

  return (
    <VersionsContext.Provider
      value={{
        versions,
        downloadManifest,
        getByType,
        getByName,
      }}
    >
      {children}
    </VersionsContext.Provider>
  );
}
