import * as fs from 'node:fs';
import {pairAsync} from './helpers/pairAsync';

export async function revertAsync(filePath: string, fileStats?: fs.Stats) {
  const pair = await pairAsync(filePath, fileStats);
  const {input, output} = pair;
  const {inputPath, outputPath} = pair;
  if (input && output) {
    await fs.promises.unlink(outputPath);
    const originalPath = inputPath.replace(/\.[^\.]+$/, '');
    await fs.promises.rename(inputPath, originalPath);
    return true;
  } else {
    return false;
  }
}
