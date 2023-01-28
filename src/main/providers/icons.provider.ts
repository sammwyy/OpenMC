import fs from 'fs/promises';
import path from 'path';

import { getSafeLauncherDir } from '../utils/dir.utils';
import { imageToBase64 } from '../utils/file.utils';

const FILES_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.ico'];

export default class IconsProvider {
  private iconsDir: string;

  constructor() {
    this.iconsDir = getSafeLauncherDir('icons');
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

    return icons;
  }
}
