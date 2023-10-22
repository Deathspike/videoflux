import * as app from '../..';
import * as fs from 'node:fs';
const expression = /(\.[^\.]+){2}$/;

export async function pairAsync(inputPath: string, stats?: fs.Stats) {
  const input = await statsAsync(inputPath, stats);
  const outputPath = inputPath.replace(expression, '') + app.consts.vidExt;
  const output = await fs.promises.stat(outputPath).catch(() => {});
  return {input, inputPath, output, outputPath};
}

async function statsAsync(path: string, stats?: fs.Stats) {
  return stats ?? (await fs.promises.stat(path).catch(() => {}));
}
