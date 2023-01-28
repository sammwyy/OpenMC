import fetch from 'node-fetch';
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

import { getSafeLauncherDir } from '../utils/dir.utils';
import { downloadFileIfNotExist } from '../utils/file.utils';

import Version, { VersionType } from '../../common/versions/version';
import VersionManifest, {
  ManifestType,
} from '../../common/versions/version-manifest';
import RemoteVersionManifest from '../../common/versions/remote-version-manifest';

const WELL_KNOWN_MOD = ['labymod', 'fabric', 'forge', 'liteloader', 'optifine'];

function parseManifestType(name: string, type: ManifestType): VersionType {
  let result: VersionType = 'custom';

  // Check if is vanilla.
  if (type === 'release' && name.includes('.') && !name.includes(' ')) {
    result = 'release';
  } else if (type === 'old_alpha' || type === 'old_beta') {
    result = 'old';
  } else if (type === 'snapshot') {
    result = 'snapshot';
  } else {
    // Else try detect mod.
    for (let i = 0; i < WELL_KNOWN_MOD.length; i += 1) {
      const mod = WELL_KNOWN_MOD[i];

      if (name.toLowerCase().includes(mod)) {
        result = 'modded';
      }
    }
  }

  return result;
}

function parseVersion(manifest: VersionManifest): Version {
  const name = manifest.id;
  const time = manifest.releaseTime;
  const type = parseManifestType(name, manifest.type);
  return { name, manifest, time, type, status: 'missing' };
}

async function listRemotes(): Promise<Version[]> {
  const req = await fetch(
    'https://launchermeta.mojang.com/mc/game/version_manifest.json'
  );
  const json = await req.json();
  const remote = json as RemoteVersionManifest;

  return remote.versions.map((v) => ({
    name: v.id,
    time: v.releaseTime,
    type: parseManifestType(v.id, v.type),
    manifestUrl: v.url,
    status: 'missing',
  }));
}

export default class VersionsProvider {
  private librariesDir: string;
  private versionsDir: string;

  constructor() {
    this.librariesDir = getSafeLauncherDir('libraries');
    this.versionsDir = getSafeLauncherDir('versions');
  }

  async downloadVersion(
    version: Version,
    onDownloadStart: () => void,
    onFileDownloaded: (file: string) => void,
    onDownloadEnd: (error: boolean) => void
  ) {
    onDownloadStart();

    const { manifest } = version;
    if (manifest) {
      const jarFile = path.join(
        this.versionsDir,
        version.name,
        `${version.name}.jar`
      );
      downloadFileIfNotExist(jarFile, manifest.downloads.client.url);

      for (let i = 0; i < manifest.libraries.length; i += 1) {
        const lib = manifest.libraries[i];
        const { artifact } = lib.downloads;
        const libPath = path.join(this.librariesDir, artifact.path || '');
        onFileDownloaded(lib.name);
        await downloadFileIfNotExist(libPath, artifact.url);
      }
    }

    onDownloadEnd(false);
  }

  async isVersionDownloaded(version: Version) {
    const jarFile = path.join(
      this.versionsDir,
      version.name,
      `${version.name}.jar`
    );

    if (!fsSync.existsSync(jarFile) || !version.manifest) {
      return false;
    }

    const libs = version.manifest.libraries;

    for (let i = 0; i < libs?.length; i += 1) {
      const lib = libs[i];
      const libPath = path.join(
        this.librariesDir,
        lib.downloads.artifact.path || ''
      );

      if (!fsSync.existsSync(libPath)) {
        return false;
      }
    }

    return true;
  }

  async listLocals(): Promise<Version[]> {
    const versions = [];
    const files = await fs.readdir(this.versionsDir);

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const filePath = path.join(this.versionsDir, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        const manifestFile = path.join(filePath, `${file}.json`);
        const exist = fsSync.existsSync(manifestFile);
        if (exist) {
          const raw = await fs.readFile(manifestFile, {
            encoding: 'utf-8',
          });
          const manifest: VersionManifest = JSON.parse(raw);
          const version = parseVersion(manifest);
          const downloaded = await this.isVersionDownloaded(version);
          version.status = downloaded ? 'ready' : 'missing';
          versions.push(version);
        }
      }
    }
    return versions;
  }

  async listVersions(): Promise<Version[]> {
    const locals = await this.listLocals();
    const remotes = await listRemotes();

    const results = [
      ...locals,
      ...remotes.filter((item) => {
        for (let i = 0; i < locals.length; i += 1) {
          const local = locals[i];
          if (local.name === item.name) {
            return false;
          }
        }

        return true;
      }),
    ];

    return results;
  }

  public async downloadManifest(url: string): Promise<Version> {
    const req = await fetch(url);
    const json = await req.json();
    const manifest = json as VersionManifest;
    const version = parseVersion(manifest);

    const dir = path.join(this.versionsDir, version.name);
    const jsonFile = path.join(dir, `${version.name}.json`);

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(jsonFile, JSON.stringify(json));

    return version;
  }
}
