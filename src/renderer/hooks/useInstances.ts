import { useContext } from 'react';
import InstancesContext from '../contexts/instances/instances-context';

const useInstances = () => useContext(InstancesContext);

export default useInstances;
