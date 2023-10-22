import * as fs from 'node:fs';
import {pairAsync} from './helpers/pairAsync';

export async function commitAsync(filePath: string, fileStats?: fs.Stats) {
  const pair = await pairAsync(filePath, fileStats);
  const {input, output} = pair;
  if (input && output) {
    await fs.promises.unlink(pair.inputPath);
    return true;
  } else {
    return false;
  }
}
