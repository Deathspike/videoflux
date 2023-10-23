import * as app from '..';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {probeAsync} from './helpers/probeAsync';

export async function encodeAsync(paths: Array<string>, options: app.Options) {
  for (const path of paths) {
    await checkAsync(path, options);
  }
}

async function checkAsync(path: string, options: app.Options) {
  const stats = await fs.promises.stat(path).catch(() => {});
  if (!stats) {
    console.log(`Rejected ${path}`);
  } else if (stats.isDirectory()) {
    console.log(`Checking ${path}`);
    await directoryAsync(path, options);
    console.log(`Finished ${path}`);
  } else if (stats.isFile() && app.isVideo(path)) {
    console.log(`Fetching ${path}`);
    const result = await fileAsync(path, options).catch(() => false);
    console.log(`Finished ${path} (${result})`);
  }
}

async function directoryAsync(directoryPath: string, options: app.Options) {
  const names = await fs.promises.readdir(directoryPath).catch(() => []);
  const paths = names.map(x => path.join(directoryPath, x));
  for (const path of paths) {
    const stats = await fs.promises.stat(path).catch(() => {});
    if (stats?.isDirectory()) {
      await checkAsync(path, options);
    } else if (stats?.isFile() && app.isVideo(path)) {
      await checkAsync(path, options);
    }
  }
}

async function fileAsync(filePath: string, options: app.Options) {
  if (options.force) return await app.encodeAsync(filePath, options);
  const metadata = await probeAsync(filePath);
  const streams = metadata.streams.filter(x => x.codec_type === 'video');
  const isAv1 = streams.every(x => x.codec_name === 'av1');
  return isAv1 || (await app.encodeAsync(filePath, options));
}
