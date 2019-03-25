const process = require('process');
const yargs = require('yargs');
const js = require('./js/js');
const formatExt = require('./utils/formatExt');

const cwd = process.cwd();

const argv = yargs
  .command(
    '[file]',
    'Check directory.',
    function(yargs) {
      yargs
        .positional('file', {
          describe: 'Directory to check.',
          default: cwd
        });
    },
    function(argv) {
      const extStr = argv.ext;

      js({
        cwd: argv.file,
        ext: formatExt(extStr)
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