import { useContext } from 'react';
import LogsContext from 'renderer/contexts/logging/logs-context';

const useLogs = () => useContext(LogsContext);

export default useLogs;
