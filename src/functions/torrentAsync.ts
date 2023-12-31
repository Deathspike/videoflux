import * as fs from 'node:fs';
import * as path from 'node:path';
import {getAnnounceList} from './helpers/getAnnounceList';
import createTorrent from 'create-torrent';

export async function torrentAsync(rootPath: string, filePaths: Array<string>) {
  const name = path.basename(rootPath);
  const sizeInBytes = await getSizeInBytesAsync(filePaths);
  const pieceLength = calculatePieceLength(sizeInBytes);
  return await new Promise<Buffer>((resolve, reject) => {
    const announceList = getAnnounceList();
    const streams = getStreams(rootPath, filePaths, name);
    createTorrent(streams, {announceList, name, pieceLength}, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
}

function calculatePieceLength(sizeInBytes: number) {
  const minLength = 16384;
  const byteScale = Math.max(1, sizeInBytes / 1024);
  return Math.max(minLength, (1 << (Math.log2(byteScale) + 0.5)) | 0);
}

async function getSizeInBytesAsync(filePaths: Array<string>) {
  const statPromises = filePaths.map(x => fs.promises.stat(x));
  const stats = await Promise.all(statPromises);
  return stats.reduce((p, c) => p + c.size, 0);
}

function getStreams(rootPath: string, filePaths: Array<string>, name: string) {
  return filePaths.map(x => {
    const fullPath = path.join(name, path.relative(rootPath, x));
    const stream = fs.createReadStream(x);
    return Object.assign(stream, {fullPath});
  });
}
