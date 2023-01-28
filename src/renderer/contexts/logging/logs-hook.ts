import LogEntry from './log-entry';

export default interface LogsHook {
  entries: LogEntry[];

  info: (message: string) => void;
  crit: (message: string) => void;
  debug: (message: string) => void;
  warn: (message: string) => void;
}
