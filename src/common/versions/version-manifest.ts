export type ManifestRuleAction = 'allow' | 'deny';

export interface ManifestRule {
  action: ManifestRuleAction;
  features?: Record<string, string | boolean | number>;
  os?: {
    name?: string;
    version?: string;
    arch?: string;
  };
}

export interface ManifestArgumentObj {
  value: string | string[];
  rules: ManifestRule[];
}

export type ManifestArgument = string | ManifestArgumentObj;

export interface ManifestFile {
  id?: string;
  path?: string;
  sha1: string;
  size: number;
  url: string;
}

export interface ManifestLibrary {
  downloads: {
    artifact: ManifestFile;
  };
  name: string;
  rules?: ManifestRule[];
}

export type ManifestType = 'snapshot' | 'release' | 'old_alpha' | 'old_beta';

export default interface VersionManifest {
  arguments: ManifestArgument[];
  assetIndex: {
    id: string;
    sha1: string;
    size: number;
    totalSize: number;
    ulr: string;
  };
  assets: string;
  downloads: {
    client: ManifestFile;
    client_mappings?: ManifestFile;
    server: ManifestFile;
    server_mappings?: ManifestFile;
  };
  id: string;
  javaVersion: {
    component: string;
    majorVersion: number;
  };
  libraries: ManifestLibrary[];
  logging: {
    client: {
      argument: string;
      file: ManifestFile;
      type: string;
    };
  };
  mainClass: string;
  minimumLauncherVersion: number;
  releaseTime: string;
  time: string;
  type: ManifestType;
}
