import Instance from '../../../common/instances/instance';

export default interface InstanceHook {
  instances: Instance[];
  addInstance: (instance: Instance) => void;
  removeInstance: (instance: Instance) => void;
}
