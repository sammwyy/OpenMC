import {Config} from 'common/config/config-metadata'
import fs from 'fs/promises';
import { getLauncherDir } from '../utils/dir.utils';
import path from 'path';

export default class ConfigProvider {
  private openmcDir: string;
  private config: Config | null;

  constructor() {
    this.config = null;
    this.openmcDir = getLauncherDir();
  }

  async loadConfig(): Promise<Config> {
      const file = path.join(this.openmcDir, "config.json");
      const raw = await fs.readFile(file, { encoding: "utf8" });
      const configJson = JSON.parse(raw);
      this.config = configJson;
      return configJson as Config;
  }

  async saveConfig(minRam: number, maxRam: number, username: string) {
    const file = path.join(this.openmcDir, "config.json");
    const raw = await fs.readFile(file, { encoding: "utf8" });
    const config = JSON.parse(raw);
    // The changes to the config
    config.memory.min = minRam; config.memory.max = maxRam; config.account.username = username;
    // Stringify and save
    const configJsonString = JSON.stringify(config);
    await fs.writeFile(file, configJsonString);
  }

  public getConfig(): Config | null {
    return this.config;
  }
}