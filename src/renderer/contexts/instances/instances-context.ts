import React from 'react';
import Instance from '../../../common/instances/instance';
import InstanceHook from './instance-hook';

const InstancesContext = React.createContext<InstanceHook>({
  instances: <Instance[]>[],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addInstance: (instance: Instance): void => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeInstance: (instance: Instance): void => {},
});

export default InstancesContext;
