const process = require('process');
const yargs = require('yargs');
const js = require('./js/js');

const cwd = process.cwd();

const argv = yargs
  .command(
    '[file]',
    'Check directory.',
    (yargs) => {
      yargs
        .positional('file', {
          describe: 'Directory to check.',
          default: cwd
        });
    },
    (argv) => {
      js({
        cwd: argv.file
      });
    }
  )
  .options({
    ext: {
      describe: 'Extension name',
      type: 'string'
    }
  })
  .argv;