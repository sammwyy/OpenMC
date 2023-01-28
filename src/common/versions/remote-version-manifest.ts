import { ManifestType } from './version-manifest';

export interface RemoteVersion {
  id: string;
  type: ManifestType;
  url: string;
  time: string;
  releaseTime: string;
}

export default interface RemoteVersionManifest {
  latest: {
    release: string;
    snapshot: string;
  };
  versions: RemoteVersion[];
}
