import React from 'react';
import LogEntry from './log-entry';
import LogsHook from './logs-hook';

const LogsContext = React.createContext<LogsHook>({
  entries: <LogEntry[]>[],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  crit: (message: string): void => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info: (message: string): void => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn: (message: string): void => {},

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug: (message: string): void => {},
});

export default LogsContext;
