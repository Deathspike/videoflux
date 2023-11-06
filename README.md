# videoflux

Your gateway to next-generation video encoding.

# Prerequisites

- [`node`](http://nodejs.org/) >= `18`
- [`npm`](https://www.npmjs.org/) >= `8`
- [`ffmpeg`](https://ffmpeg.org/) >= `6` (`svt-av1` >= `1.7`)
- [`ffprobe`](https://ffmpeg.org/) >= `6`

# Install

```
npm install -g videoflux
```

# Usage

```
Usage: videoflux [options] [command]

Your gateway to next-generation video encoding.

Options:
  -V, --version                  output the version number
  -h, --help                     display help for command

Commands:
  commit <path...>               Commit videos
  encode [options] <path...>     Encode videos
  enqueue <serverUrl> <path...>  Enqueue video encodes
  rollback <path...>             Rollback videos
  server [options]               Listen for HTTP events
  stats <path...>                Video stats
  torrent <path...>              Create torrent
  help [command]                 display help for command
```
