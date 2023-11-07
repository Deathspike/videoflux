const entries = new Array<{
  level: 'E' | 'I' | 'V';
  message: string;
}>();

export const logger = {
  all() {
    return entries.map(x => x.message);
  },

  error(value: unknown) {
    const error = String(value instanceof Error ? value.stack : value);
    const message = format('E', error);
    trace('E', message);
    console.error(message);
  },

  info(value: string) {
    const message = format('I', value);
    trace('I', message);
    console.log(message);
  },

  verbose(value: string, verbose: boolean) {
    const message = format('V', value);
    trace('V', message);
    if (verbose) console.log(message);
  }
};

function format(level: typeof entries[0]['level'], value: string) {
  return `(${level}) [${new Date().toLocaleTimeString()}] ${value}`;
}

function trace(level: typeof entries[0]['level'], message: string) {
  while (entries[entries.length - 1]?.level === 'V') entries.pop();
  entries.push({level, message});
  while (entries.length >= 25) entries.shift();
}
