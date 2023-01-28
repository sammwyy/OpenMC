import { PropsWithChildren, useEffect, useState } from 'react';
import {
  createInstance,
  getInstanceMetadata,
  listInstances,
} from 'renderer/services/instance.service';

import Instance from '../../../common/instances/instance';
import InstancesContext from './instances-context';

export default function InstancesProvider({ children }: PropsWithChildren) {
  const [instances, setInstances] = useState<Instance[]>([]);

  function updateInstance(instance: Instance) {
    setInstances([...instances.filter((v) => v !== instance), instance]);
  }

  async function addInstance(instance: Instance) {
    instances.push(instance);
    const newInstance = await createInstance(instance);
    return newInstance;
  }

  function removeInstance(instance: Instance) {
    const newInstances = instances.filter((item) => item !== instance);
    setInstances(newInstances);
  }

  function getInstanceByName(name: string) {
    for (let i = 0; i < instances.length; i += 1) {
      const instance = instances[i];
      if (instance.name === name) {
        return instance;
      }
    }

    return null;
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    listInstances().then(setInstances).catch(console.error);
  }, []);

  return (
    <InstancesContext.Provider
      value={{
        instances,
        addInstance,
        updateInstance,
        removeInstance,
        getInstanceByName,
        getInstanceMetadata,
      }}
    >
      {children}
    </InstancesContext.Provider>
  );
}
