import {spawnAsync} from './helpers/spawnAsync';

export async function probeAsync(filePath: string) {
  const args = ['-v', 'quiet', '-print_format', 'json', '-show_streams'];
  const value = await spawnAsync('ffprobe', args.concat(filePath));
  return JSON.parse(value) as Probe;
}

type Probe = {
  streams: Array<ProbeStream>;
};

type ProbeStream = {
  codec_name: string;
  codec_type: string;
};
