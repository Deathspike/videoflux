import * as childProcess from 'node:child_process';
import {Future} from './Future';

export class Session {
  private readonly exit = new Future<boolean>();
  private didStart = false;

  private constructor(
    private readonly args: Array<string>,
    private readonly verbose: boolean
  ) {}

  static async runAsync(args: Array<string>, verbose = false) {
    const session = new Session(args, verbose);
    session.spawn();
    return await session.exit.getAsync();
  }

  spawn() {
    const process = childProcess.spawn('ffmpeg', this.args);
    process.stdout.on('data', this.onData.bind(this));
    process.stderr.on('data', this.onData.bind(this));
    process.on('error', this.onError.bind(this));
    process.on('exit', this.onExit.bind(this));
  }

  private onData(buffer: Buffer) {
    for (const message of buffer.toString().split('\n')) {
      this.didStart ||= /time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/.test(message);
      if (!this.verbose) continue;
      console.debug(message);
    }
  }

  private onError(error: Error) {
    console.error(error.stack);
  }

  private onExit() {
    this.exit.resolve(this.didStart);
  }
}
