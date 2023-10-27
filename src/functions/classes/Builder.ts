export class Builder {
  constructor(
    private readonly filePath: string,
    private readonly params: Params
  ) {}

  build() {
    const args = new Array<string>();
    this.createArgs(args);
    this.createAudioStream(args);
    this.createVideoFilter(args);
    this.createVideoStream(args);
    return args;
  }

  private createArgs(args: Array<string>) {
    args.push('-y');
    args.push('-i', this.filePath);
    args.push('-map', '0');
  }

  private createAudioStream(args: Array<string>) {
    args.push('-c:a', 'libopus');
    args.push('-b:a', `${this.params.opusBitRate}k`);
    args.push('-af', 'aformat=channel_layouts=7.1|5.1|stereo');
  }

  private createVideoFilter(args: Array<string>) {
    if (!this.params.hqdn3d) return;
    args.push('-vf', 'hqdn3d');
  }

  private createVideoStream(args: Array<string>) {
    args.push('-c:v', 'libsvtav1', '-svtav1-params', 'keyint=10s:tune=2');
    args.push('-crf', `${this.params.av1Crf}`);
    args.push('-preset', `${this.params.av1Preset}`);
    args.push('-pix_fmt', 'yuv420p10le');
  }
}

type Params = {
  av1Crf: number;
  av1Preset: number;
  hqdn3d: boolean;
  opusBitRate: number;
};
