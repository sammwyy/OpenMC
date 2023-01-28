import fs from 'fs';
import path from 'path';

export function getAppdataDir() {
  return (
    process.env.APPDATA ||
    (process.platform === 'darwin'
      ? `${process.env.HOME}/Library/Preferences`
      : `${process.env.HOME}/.local/share`)
  );
}

export function getLauncherDir() {
  return path.join(getAppdataDir(), '.openmc');
}

export function getLauncherFile(...filePath: string[]) {
  return path.join(getLauncherDir(), ...filePath);
}

export function getSafeLauncherDir(...filePath: string[]) {
  const file = getLauncherFile(...filePath);
  fs.mkdirSync(file, { recursive: true });
  return file;
}
