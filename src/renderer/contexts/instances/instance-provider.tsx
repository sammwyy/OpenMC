import { PropsWithChildren, useEffect, useState } from 'react';
import { listInstances } from 'renderer/services/instance.service';

import Instance from '../../../common/instances/instance';
import InstancesContext from './instances-context';

export default function InstancesProvider({ children }: PropsWithChildren) {
  const [instances, setInstances] = useState<Instance[]>([]);

  function addInstance(instance: Instance) {
    instances.push(instance);
  }

  function removeInstance(instance: Instance) {
    const newInstances = instances.filter((item) => item !== instance);
    setInstances(newInstances);
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
        removeInstance,
      }}
    >
      {children}
    </InstancesContext.Provider>
  );
}
