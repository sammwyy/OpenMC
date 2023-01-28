export interface InstanceMod {
  name: string;
  enabled: boolean;
}

export default interface InstanceMetadata {
  mods: InstanceMod[];
  resourcepacks: string[];
  shaderpacks: string[];
  worlds: string[];
}
