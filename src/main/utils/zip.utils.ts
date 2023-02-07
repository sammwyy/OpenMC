import fs from 'fs';
import unzipper from 'unzipper';

export default function unzip(file: string, output: string) {
  return new Promise((resolve) =>
    fs
      .createReadStream(file)
      .pipe(unzipper.Extract({ path: output }))
      .on('end', resolve)
  );
}
