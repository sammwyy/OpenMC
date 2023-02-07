import { PropsWithChildren, useEffect, useState } from 'react';

import {
  downloadManifestWithUrl,
  listVersions,
} from '../../services/versions.service';
import Version, { VersionType } from '../../../common/versions/version';
import VersionsContext from './versions-context';

export default function VersionsProvider({ children }: PropsWithChildren) {
  const [versions, setVersions] = useState<Version[]>([]);

  async function updateVersions() {
    const result = await listVersions();
    setVersions(result);
  }

  async function downloadManifest(version: Version): Promise<Version> {
    const versionWithManifest = await downloadManifestWithUrl(
      version.manifestUrl || ''
    );
    version.manifest = versionWithManifest;
    updateVersions();
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

  useEffect(() => {
    updateVersions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VersionsContext.Provider
      value={{
        versions,
        downloadManifest,
        getByType,
        getByName,
        updateVersions,
      }}
    >
      {children}
    </VersionsContext.Provider>
  );
}
