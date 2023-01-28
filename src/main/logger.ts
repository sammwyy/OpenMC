import { WebContents } from 'electron';

class LoggerHandler {
  private app: WebContents | undefined;

  constructor() {
    this.app = undefined;
  }

  registerWebContents(app: WebContents | undefined) {
    this.app = app;
  }

  crit(message: string) {
    // eslint-disable-next-line no-console
    console.error(message);
    this.app?.send('app:log', 'crit', message);
  }

  debug(message: string) {
    // eslint-disable-next-line no-console
    console.debug(message);
    this.app?.send('app:log', 'dbug', message);
  }

  info(message: string) {
    // eslint-disable-next-line no-console
    console.info(message);
    this.app?.send('app:log', 'info', message);
  }

  warn(message: string) {
    // eslint-disable-next-line no-console
    console.warn(message);
    this.app?.send('app:log', 'warn', message);
  }
}

const Logger = new LoggerHandler();
export default Logger;
