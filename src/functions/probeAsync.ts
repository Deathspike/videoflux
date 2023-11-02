import * as app from '..';
import * as childProcess from 'node:child_process';

export async function probeAsync(filePath: string) {
  const args = ['-v', 'quiet', '-print_format', 'json', '-show_streams'];
  const value = await spawnAsync('ffprobe', args.concat(filePath));
  return JSON.parse(value) as app.Metadata;
}

async function spawnAsync(command: string, args: Array<string>) {
  return await new Promise<string>((resolve, reject) => {
    const result = new Array<Buffer>();
    const process = childProcess.spawn(command, args);
    process.stdout.on('data', x => result.push(x));
    process.stderr.on('data', x => result.push(x));
    process.on('error', reject);
    process.on('exit', () => resolve(Buffer.concat(result).toString('utf8')));
  });
}
