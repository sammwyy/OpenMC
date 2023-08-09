import fs from 'fs/promises';
import fsSync from 'fs';

import Settings from '../../common/settings';
import { getLauncherFile } from '../utils/dir.utils';
import Logger from '../logger';

const DEFAULT_SETTINGS: Settings = {
  selectedAccount: -1,
};

export default class SettingsProvider {
  private configFile: string;
  private settings: Settings | null;

  constructor() {
    this.configFile = getLauncherFile('settings.json');
    this.settings = null;
  }

  async saveConfig(toSave?: Settings): Promise<void> {
    if (toSave) {
      this.settings = toSave;
    }

    if (this.settings != null) {
      const raw = JSON.stringify(this.settings);
      await fs.writeFile(this.configFile, raw, { encoding: 'utf-8' });
      Logger.info(`Saved launcher configuration file.`);
    } else {
      Logger.warn(`Prvent config save due to null object.`);
    }
  }

  async createDefaultConfig(overwrites = false): Promise<boolean> {
    const exist = fsSync.existsSync(this.configFile);
    if (exist && !overwrites) {
      return false;
    }

    this.settings = DEFAULT_SETTINGS;
    await this.saveConfig();
    return true;
  }

  async loadConfig(): Promise<Settings> {
    await this.createDefaultConfig(false);

    const raw = await fs.readFile(this.configFile, { encoding: 'utf-8' });
    const loadedConfig = JSON.parse(raw) as Settings;
    this.settings = { ...DEFAULT_SETTINGS, ...loadedConfig };
    Logger.info(`Loaded launcher configuration file.`);
    return this.settings;
  }
}
