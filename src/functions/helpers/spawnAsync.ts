import * as childProcess from 'node:child_process';

export async function spawnAsync(command: string, args: Array<string>) {
  return await new Promise<string>((resolve, reject) => {
    const result = new Array<Buffer>();
    const process = childProcess.spawn(command, args);
    process.stdout.on('data', x => result.push(x));
    process.stderr.on('data', x => result.push(x));
    process.on('error', reject);
    process.on('exit', () => resolve(Buffer.concat(result).toString('utf8')));
  });
}
