export type LogLevel = 'info' | 'warn' | 'crit' | 'dbug';

export default interface LogEntry {
  date: string;
  level: LogLevel;
  message: string;
}
