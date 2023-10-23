# videoflux

Your gateway to next-generation video encoding.

# Prerequisites

- NodeJS >= 18 (http://nodejs.org/)
- NPM >= 8 (https://www.npmjs.org/)

# Install

## Debian (Ubuntu)

1. Install _nodejs_ following the instructions at http://nodejs.org/
2. Run in _Terminal_: `apt install ffmpeg`
3. Run in _Terminal_: `npm install -g videoflux`

## MacOS

1. Install _nodejs_ following the instructions at http://nodejs.org/
2. Install _homebrew_ following the instructions at https://brew.sh/
3. Run in _Terminal_: `brew install ffmpeg`
4. Run in _Terminal_: `npm install -g videoflux`

## Windows

1. Install _nodejs_ following the instructions at http://nodejs.org/
2. Install _ffmpeg_ following the instructions at https://www.wikihow.com/Install-FFmpeg-on-Windows
3. Run in _Command Prompt_: `npm install -g videoflux`

# Usage

```
Usage: videoflux [options] [command]

Your gateway to next-generation video encoding.

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  commit <path...>            Commit videos
  encode [options] <path...>  Encode videos
  rollback <path...>          Rollback videos
  server [options]            Listen for HTTP events
  stats <path...>             Video stats
  help [command]              display help for command
```
