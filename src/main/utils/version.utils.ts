import Version from 'common/versions/version';
import { getMavenPath, getMavenURL } from './file.utils';

export function mergeVersions(parent: Version, child: Version): Version {
  const result: Version = { ...parent, ...child };

  if (!parent?.manifest || !child?.manifest || !result?.manifest) {
    return child;
  }

  // Merge libs.
  const parentLibs = parent.manifest.libraries || [];
  const childLibs = child.manifest.libraries || [];
  const mergedLibraries = [...parentLibs, ...childLibs];

  // Merge arguments.
  const parentArgs = parent.manifest.arguments;
  const childArgs = child.manifest.arguments;
  const mergedArgs = {
    game: [...(parentArgs.game || []), ...(childArgs.game || [])],
    jvm: [...(parentArgs.jvm || []), ...(childArgs.jvm || [])],
  };

  // Merge assets.
  if (result.manifest.assets === 'legacy') {
    result.manifest.assetIndex = parent.manifest.assetIndex;
    result.manifest.assets = parent.manifest.assets;
  }

  if (result.manifest) {
    result.manifest.libraries = mergedLibraries;
    result.manifest.arguments = mergedArgs;
  }

  return result;
}

export function normalizeVersion(version: Version) {
  const result: Version = { ...version };

  if (result.manifest) {
    result.manifest.libraries = result.manifest.libraries.map((lib) => {
      if (!lib.downloads && lib.url) {
        lib.downloads = {
          artifact: {
            sha1: '',
            size: -1,
            url: getMavenURL(lib.url, lib.name),
            path: getMavenPath(lib.name),
          },
        };
      }

      return lib;
    });
  }

  return result;
}
