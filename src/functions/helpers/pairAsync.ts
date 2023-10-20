import * as app from '../..';
import * as fs from 'node:fs';

export async function pairAsync(filePath: string, fileStats?: fs.Stats) {
  const input = fileStats ?? (await fs.promises.stat(filePath).catch(() => {}));
  const outputPath = filePath.replace(/(\.[^\.]+){2}$/, '') + app.consts.vidExt;
  const output = await fs.promises.stat(outputPath).catch(() => {});
  return {input, output};
}
