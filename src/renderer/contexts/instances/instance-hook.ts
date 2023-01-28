import InstanceMetadata from 'common/instances/instance-metadata';
import Instance from '../../../common/instances/instance';

export default interface InstanceHook {
  instances: Instance[];
  addInstance: (instance: Instance) => Promise<Instance>;
  removeInstance: (instance: Instance) => void;
  getInstanceByName: (name: string) => Instance | null;
  getInstanceMetadata: (name: string) => Promise<InstanceMetadata | null>;
}
