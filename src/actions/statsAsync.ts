import * as app from '..';
import * as fs from 'node:fs';
import * as path from 'node:path';

export async function statsAsync(paths: Array<string>) {
  for (const path of paths) {
    await checkAsync(path);
  }
}

async function checkAsync(path: string) {
  const stats = await fs.promises.stat(path).catch(() => {});
  if (!stats) {
    console.log(`Rejected ${path}`);
  } else if (stats.isDirectory()) {
    console.log(`Checking ${path}`);
    await directoryAsync(path);
    console.log(`Finished ${path}`);
  } else if (stats.isFile() && path.endsWith(app.consts.bckExt)) {
    console.log(`Fetching ${path}`);
    const result = await app.statsAsync(path, stats);
    console.log(`Finished ${path} (${result})`);
  }
}

async function directoryAsync(directoryPath: string) {
  const names = await fs.promises.readdir(directoryPath).catch(() => []);
  const paths = names.map(x => path.join(directoryPath, x));
  for (const path of paths) {
    const stats = await fs.promises.stat(path).catch(() => {});
    if (stats?.isDirectory()) {
      await checkAsync(path);
    } else if (stats?.isFile() && path.endsWith(app.consts.bckExt)) {
      await checkAsync(path);
    }
  }
}
