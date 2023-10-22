import * as fs from 'node:fs';
import {pairAsync} from './helpers/pairAsync';

export async function rollbackAsync(filePath: string, fileStats?: fs.Stats) {
  const result = await pairAsync(filePath, fileStats);
  const {input, output} = result;
  if (input && output) {
    await fs.promises.unlink(result.outputPath);
    const originalPath = result.inputPath.replace(/\.[^\.]+$/, '');
    await fs.promises.rename(result.inputPath, originalPath);
    return true;
  } else {
    return false;
  }
}
