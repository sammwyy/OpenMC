import { PropsWithChildren, useEffect, useState } from 'react';

import {
  downloadManifestWithUrl,
  listVersions,
} from '../../services/versions.service';
import Version, { VersionType } from '../../../common/versions/version';
import VersionsContext from './versions-context';

export default function VersionsProvider({ children }: PropsWithChildren) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [lastFile, setLastFile] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line no-console
    listVersions().then(setVersions).catch(console.error);
  }, []);

  function updateVersion(version: Version) {
    setVersions([...versions.filter((v) => v !== version), version]);
  }

  async function downloadManifest(version: Version): Promise<Version> {
    const versionWithManifest = await downloadManifestWithUrl(
      version.manifestUrl || ''
    );
    version.manifest = versionWithManifest;
    updateVersion(version);
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
    window.electron.ipcRenderer.on('versions:download', (_args) => {
      const args = _args as unknown as string[];

      const status = args[0] as string;
      const name = args[1] as string;
      const file = args[2] as string;

      const version = getByName(name);

      if (!version) {
        return;
      }

      if (status === 'start') {
        version.status = 'downloading';
        setLastFile('');
      } else if (status === 'error') {
        version.status = 'missing';
        setLastFile(null);
      } else if (status === 'end') {
        version.status = 'ready';
        setLastFile(null);
      } else if (status === 'file' && file) {
        setLastFile(file);
      }

      updateVersion(version);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VersionsContext.Provider
      value={{
        versions,
        lastFile,
        downloadManifest,
        getByType,
        getByName,
      }}
    >
      {children}
    </VersionsContext.Provider>
  );
}
