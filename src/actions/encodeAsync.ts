import * as app from '..';
import * as fs from 'node:fs';
import * as path from 'node:path';

export async function encodeAsync(paths: Array<string>, options: app.Options) {
  for (const path of paths) {
    await checkAsync(path, options);
  }
}

async function checkAsync(path: string, options: app.Options) {
  const stats = await fs.promises.stat(path).catch(() => {});
  if (!stats) {
    app.logger.info(`Rejected ${path}`);
  } else if (stats.isDirectory()) {
    app.logger.info(`Checking ${path}`);
    await directoryAsync(path, options);
    app.logger.info(`Finished ${path}`);
  } else if (stats.isFile() && app.isVideo(path)) {
    app.logger.info(`Fetching ${path}`);
    const result = await fileAsync(path, options).catch(() => false);
    app.logger.info(`Finished ${path} (${result})`);
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
  const metadata = await app.probeAsync(filePath);
  const streams = metadata.streams.filter(x => x.codec_type === 'video');
  const canSkip = streams.every(x => x.codec_name === 'av1') && !options.force;
  return canSkip || (await app.encodeAsync(filePath, metadata, options));
}
