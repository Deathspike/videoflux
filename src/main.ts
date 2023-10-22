import * as app from '.';
import * as commander from 'commander';

export function main() {
  return new commander.Command(require('../package').name)
    .description(require('../package').description)
    .version(require('../package').version)
    .addCommand(commandEncode())
    .addCommand(commandInfo())
    .addCommand(commandRollback())
    .addCommand(commandServer());
}

function commandEncode() {
  return new commander.Command('encode')
    .arguments('<path...>')
    .description('Encode videos')
    .option('--force', 'Determines whether to force an re-encode')
    .addOption(optionQuality())
    .action(app.actions.encodeAsync);
}

function commandInfo() {
  return new commander.Command('info')
    .arguments('<path...>')
    .description('Videos info')
    .action(app.actions.infoAsync);
}

function commandRollback() {
  return new commander.Command('rollback')
    .arguments('<path...>')
    .description('Rollback videos')
    .action(app.actions.rollbackAsync);
}

function commandServer() {
  return new commander.Command('server')
    .description('Listen for HTTP events')
    .addOption(optionQuality())
    .action(app.actions.serverAsync);
}

function optionQuality() {
  return new commander.Option('--quality <s>', 'Determines the encode quality')
    .choices(['hq', 'hqd', 'mq', 'mqd', 'lq', 'lqd'])
    .default('hq');
}
