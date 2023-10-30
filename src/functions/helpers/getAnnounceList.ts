export function getAnnounceList() {
  const announceList = new Array<string>();
  parseEnv(announceList);
  parsePresets(announceList);
  return announceList.map(x => [x]);
}

function parseEnv(announceList: Array<string>) {
  for (const [key, value] of Object.entries(process.env)) {
    if (!key.startsWith('TORRENT_ANNOUNCE') || !value) continue;
    announceList.push(value);
  }
}

function parsePresets(announceList: Array<string>) {
  for (const value of presets) {
    if (announceList.includes(value)) continue;
    announceList.push(value);
  }
}

const presets = [
  'udp://open.stealth.si:80/announce',
  'udp://explodie.org:6969/announce',
  'udp://exodus.desync.com:6969/announce',
  'udp://tracker.openbittorrent.com:6969/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://tracker.torrent.eu.org:451/announce'
];
