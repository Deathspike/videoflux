import * as app from '..';
import * as fs from 'node:fs';
import * as path from 'node:path';

export async function torrentAsync(paths: Array<string>) {
  for (const path of paths) {
    const filePaths = new Array<string>();
    await checkAsync(path, filePaths);
    await writeAsync(path, filePaths);
  }
}

async function checkAsync(path: string, filePaths: Array<string>) {
  const stats = await fs.promises.stat(path).catch(() => {});
  if (!stats) {
    console.log(`Rejected ${path}`);
  } else if (stats.isDirectory()) {
    console.log(`Checking ${path}`);
    await directoryAsync(path, filePaths);
    console.log(`Finished ${path}`);
  } else if (stats.isFile() && app.isVideo(path)) {
    console.log(`Fetching ${path}`);
    filePaths.push(path);
    console.log(`Finished ${path}`);
  }
}

async function directoryAsync(directoryPath: string, filePaths: Array<string>) {
  const names = await fs.promises.readdir(directoryPath).catch(() => []);
  const paths = names.map(x => path.join(directoryPath, x));
  for (const path of paths) {
    const stats = await fs.promises.stat(path).catch(() => {});
    if (stats?.isDirectory()) {
      await checkAsync(path, filePaths);
    } else if (stats?.isFile() && app.isVideo(path)) {
      await checkAsync(path, filePaths);
    }
  }
}

async function writeAsync(rootPath: string, filePaths: Array<string>) {
  const {dir, base} = path.parse(rootPath);
  const torrentPath = path.join(dir, `${base}.torrent`);
  console.log(`Fetching ${torrentPath}`);
  const torrent = await app.torrentAsync(rootPath, filePaths);
  await fs.promises.writeFile(torrentPath, torrent);
  console.log(`Finished ${torrentPath}`);
}
