import { PropsWithChildren, useEffect, useState } from 'react';
import LogEntry, { LogLevel } from './log-entry';
import LogsContext from './logs-context';

export default function LogsProvider({ children }: PropsWithChildren) {
  const [entries, setEntries] = useState<LogEntry[]>([]);

  function log(level: LogLevel, message: string) {
    entries.push({
      date: new Date(Date.now()).toLocaleTimeString(),
      message,
      level,
    });
    setEntries(entries);
  }

  function crit(message: string) {
    log('crit', message);
  }

  function debug(message: string) {
    log('dbug', message);
  }

  function info(message: string) {
    log('info', message);
  }

  function warn(message: string) {
    log('warn', message);
  }

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'app:log',
      (level: unknown, message: unknown) => {
        log(level as LogLevel, message as string);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LogsContext.Provider
      value={{
        entries,
        crit,
        debug,
        info,
        warn,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
}
