import * as app from '.';
import * as commander from 'commander';

export function main() {
  return new commander.Command(require('../package').name)
    .description(require('../package').description)
    .version(require('../package').version)
    .addCommand(commandCommit())
    .addCommand(commandEncode())
    .addCommand(commandEnqueue())
    .addCommand(commandRollback())
    .addCommand(commandServer())
    .addCommand(commandStats())
    .addCommand(commandTorrent());
}

function commandCommit() {
  return new commander.Command('commit')
    .argument('<path...>')
    .description('Commit videos')
    .action(app.actions.commitAsync);
}

function commandEncode() {
  return new commander.Command('encode')
    .argument('<path...>')
    .description('Encode videos')
    .option('-f, --force', 'Determines whether to force re-encodes')
    .option('-v, --verbose', 'Determines whether logging is verbose')
    .addOption(optionQuality())
    .action(app.actions.encodeAsync);
}

function commandEnqueue() {
  return new commander.Command('enqueue')
    .argument('<serverUrl>')
    .argument('<path...>')
    .description('Enqueue video encodes')
    .action(app.actions.enqueueAsync);
}

function commandRollback() {
  return new commander.Command('rollback')
    .argument('<path...>')
    .description('Rollback videos')
    .action(app.actions.rollbackAsync);
}

function commandServer() {
  return new commander.Command('server')
    .description('Listen for HTTP events')
    .option('-v, --verbose', 'Determines whether logging is verbose')
    .addOption(optionQuality())
    .action(app.actions.serverAsync);
}

function commandStats() {
  return new commander.Command('stats')
    .argument('<path...>')
    .description('Video stats')
    .action(app.actions.statsAsync);
}

function commandTorrent() {
  return new commander.Command('torrent')
    .argument('<path...>')
    .description('Create torrent')
    .action(app.actions.torrentAsync);
}

function optionQuality() {
  const description = 'Determines the encode quality';
  return new commander.Option('-q, --quality <s>', description)
    .choices(['hq', 'hqd', 'mq', 'mqd', 'lq', 'lqd'])
    .default('hq');
}
