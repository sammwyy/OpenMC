/* eslint-disable no-await-in-loop */
import fs from 'fs/promises';
import path from 'path';

export async function deleteRecursive(dir: string) {
  const files = await fs.readdir(dir);

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const filePath = path.join(dir, file);
    const { isDirectory } = await fs.stat(filePath);

    if (isDirectory()) {
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
