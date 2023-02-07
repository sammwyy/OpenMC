import { app } from 'electron';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

import unzip from '../utils/zip.utils';
import Logger from '../logger';
import { getSafeLauncherDir } from '../utils/dir.utils';
import { imageToBase64 } from '../utils/file.utils';

const FILES_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.ico'];

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
