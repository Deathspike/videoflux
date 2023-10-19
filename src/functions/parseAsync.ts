import * as app from '..';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {Builder} from './classes/Builder';
import {Session} from './classes/Session';

export async function parseAsync(filePath: string, options: app.Options) {
  const args = new Builder(filePath, qualities[options.quality]).build();
  const outArgs = args.concat('-f', 'matroska', `${filePath}.vftmp`);
  if (await Session.runAsync(outArgs)) {
    const {dir, name} = path.parse(filePath);
    const outPath = path.join(dir, `${name}.mkv`);
    await fs.promises.rename(filePath, `${filePath}.vfbck`);
    await fs.promises.rename(`${filePath}.vftmp`, outPath);
    return true;
  } else {
    return false;
  }
}

const qualities = {
  hq: {
    av1Crf: 24,
    av1Preset: 10,
    hqdn3d: false,
    opusBitRate: 96
  },
  hqd: {
    av1Crf: 24,
    av1Preset: 10,
    hqdn3d: true,
    opusBitRate: 96
  },
  mq: {
    av1Crf: 32,
    av1Preset: 10,
    hqdn3d: false,
    opusBitRate: 64
  },
  mqd: {
    av1Crf: 32,
    av1Preset: 10,
    hqdn3d: true,
    opusBitRate: 64
  },
  lq: {
    av1Crf: 40,
    av1Preset: 10,
    hqdn3d: false,
    opusBitRate: 48
  },
  lqd: {
    av1Crf: 40,
    av1Preset: 10,
    hqdn3d: true,
    opusBitRate: 48
  }
};
