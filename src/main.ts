import * as app from '.';
import * as commander from 'commander';

export function main() {
  return new commander.Command(require('../package').name)
    .description(require('../package').description)
    .version(require('../package').version)
    .addCommand(commandEncode())
    .addCommand(commandProbe())
    .addCommand(commandRollback())
    .addCommand(commandStats());
}

function commandEncode() {
  return new commander.Command('encode')
    .arguments('<path...>')
    .description('Encode videos')
    .option('--force', 'Determines whether to force an re-encode')
    .addOption(optionQuality())
    .action(app.actions.encodeAsync);
}

function commandProbe() {
  return new commander.Command('probe')
    .arguments('<path...>')
    .description('Probe videos')
    .action(app.actions.probeAsync);
}

function commandRollback() {
  return new commander.Command('rollback')
    .arguments('<path...>')
    .description('Rollback videos')
    .action(app.actions.rollbackAsync);
}

function commandStats() {
  return new commander.Command('stats')
    .arguments('<path...>')
    .description('Videos stats')
    .action(app.actions.statsAsync);
}

function optionQuality() {
  return new commander.Option('--quality <s>', 'Determines the encode quality')
    .choices(['hq', 'hqd', 'mq', 'mqd', 'lq', 'lqd'])
    .default('hq');
}
