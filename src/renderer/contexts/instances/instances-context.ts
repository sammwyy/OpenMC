import React from 'react';
import Instance from '../../../common/instances/instance';
import InstanceHook from './instance-hook';

const InstancesContext = React.createContext<InstanceHook>({
  instances: <Instance[]>[],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addInstance: (instance: Instance): Promise<Instance> => {
    return new Promise(() => {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeInstance: (instance: Instance): void => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getInstanceByName: (name: string): Instance | null => {
    return null;
  },
});

export default InstancesContext;
