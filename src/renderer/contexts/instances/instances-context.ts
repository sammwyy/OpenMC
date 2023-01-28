import InstanceMetadata from 'common/instances/instance-metadata';
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
  updateInstance: (instance: Instance): void => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeInstance: (instance: Instance): void => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getInstanceByName: (name: string): Instance | null => {
    return null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getInstanceMetadata: (name: string): Promise<InstanceMetadata | null> => {
    return new Promise(() => {});
  },
});

export default InstancesContext;
