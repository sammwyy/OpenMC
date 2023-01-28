import VersionManifest from './version-manifest';

export type VersionType = 'release' | 'snapshot' | 'old' | 'modded' | 'custom';

export type VersionStatus = 'ready' | 'missing' | 'downloading';

export default interface Version {
  name: string;
  time: string;
  type: VersionType;
  manifest?: VersionManifest;
  manifestUrl?: string;
  status: VersionStatus;
}
