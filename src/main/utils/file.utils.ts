/* eslint-disable no-await-in-loop */
import fetch from 'node-fetch';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

export async function deleteRecursive(dir: string) {
  const files = await fs.readdir(dir);

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      await deleteRecursive(filePath);
    } else {
      await fs.unlink(filePath);
    }
  }

  await fs.unlink(dir);
}

export async function imageToBase64(file: string) {
  const bitmap = await fs.readFile(file);
  const b64 = Buffer.alloc(bitmap.length, bitmap).toString('base64');
  return `data:image/png;base64,${b64}`;
}

export function downloadFile(file: string, url: string) {
  return new Promise((resolve, reject) => {
    async function fetchAsync() {
      const dir = path.join(file, '..');
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(file, '');

      const res = await fetch(url);
      const fileStream = fsSync.createWriteStream(file);
      res.body.pipe(fileStream);
      res.body.on('error', reject);
      fileStream.on('finish', resolve);
    }

    fetchAsync();
  });
}

export async function downloadFileIfNotExist(file: string, url: string) {
  if (!fsSync.existsSync(file)) {
    await downloadFile(file, url);
  }
}
