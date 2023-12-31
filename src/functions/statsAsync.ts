import * as fs from 'node:fs';
import {pairAsync} from './helpers/pairAsync';

export async function statsAsync(filePath: string, fileStats?: fs.Stats) {
  const result = await pairAsync(filePath, fileStats);
  const {input, output} = result;
  return input && output ? `${getPercentage(input, output).toFixed(2)}%` : '?';
}

function getPercentage(input: fs.Stats, output: fs.Stats) {
  return (100 / input.size) * output.size;
}
