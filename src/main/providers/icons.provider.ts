import { app } from 'electron';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

import unzip from '../utils/zip.utils';
import Logger from '../logger';
import { getSafeLauncherDir } from '../utils/dir.utils';
import { imageToBase64, downloadFileIfNotExist } from '../utils/file.utils';

const FILES_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.ico'];
const DEFAULT_ICONS = {
  DIRT: 'https://i.imgur.com/aH72PI6.png',
  OPENMC: 'https://i.imgur.com/YLMEwEs.png',
  OPTIFINE: 'https://i.imgur.com/mYgYa08.png',
  PICKAXE: 'https://i.imgur.com/QMbqAdp.png',
  CREPER: 'https://i.imgur.com/g6khqjd.png',
  FABRIC: 'https://i.imgur.com/manAkYB.png',
  INDIUM: 'https://i.imgur.com/40tzeVD.png',
  LITHIUM: 'https://i.imgur.com/Ekywi3v.png',
  SKYFACTORY: 'https://i.imgur.com/2ezp9rw.png',
  SODIUM: 'https://i.imgur.com/Shz61E5.png',
  WARPED_NYLLIUM: 'https://i.imgur.com/UWGrZMf.png',
};

export default class IconsProvider {
  private iconsDir: string;

  constructor() {
    this.iconsDir = getSafeLauncherDir('icons');
    this.extractIconsIfEmpty();
  }

  async extractIconsIfEmpty() {
    const files = await fs.readdir(this.iconsDir);
    if (files.length === 0) {
      const assetsDir = path.join(app.getAppPath(), 'assets');
      const zipFile = path.join(assetsDir, 'default_icons.zip');

      if (fsSync.existsSync(zipFile)) {
        await unzip(zipFile, this.iconsDir);
      }
    }
  }

  async loadDefault() {
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, url] of Object.entries(DEFAULT_ICONS)) {
      const filePath = path.join(this.iconsDir, `${name}.png`);
      Logger.debug(`Downloading icon ${name} from ${url} to ${filePath}`);
      await downloadFileIfNotExist(filePath, url);
    }
  }

  async listIcons() {
    const icons = [];
    const files = await fs.readdir(this.iconsDir);
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const ext = path.extname(file);
      if (FILES_EXT.includes(ext)) {
        const filePath = path.join(this.iconsDir, file);
        const icon = await imageToBase64(filePath);
        icons.push(icon);
      }
    }
    Logger.debug(`Loaded ${icons.length} icons.`);
    return icons;
  }
}
