import Version, { VersionType } from '../../../common/versions/version';

export default interface VersionHook {
  versions: Version[];
  downloadManifest: (version: Version) => Promise<Version>;
  getByType: (type: VersionType) => Version[];
  getByName: (name: string) => Version | null;
}
