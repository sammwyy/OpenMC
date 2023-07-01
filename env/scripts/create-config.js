const fs = require('node:fs');
const path = require('path');

function getAppdataDir() {
  return (
    process.env.APPDATA ||
    (process.platform === 'darwin'
      ? `${process.env.HOME}/Library/Preferences`
      : `${process.env.HOME}/.local/share`)
  );
}

function getLauncherDir() {
  return path.join(getAppdataDir(), '.openmc');
}

const config = {
  username: 'Steve',
  mode: 'offline',
  minRam: 1024,
  maxRam: 2048,
};

const configDir = path.join(getLauncherDir(), 'config.json');

fs.writeFileSync(configDir, JSON.stringify(config));
