const process = require('process');
const path = require('path');
const yargs = require('yargs');
const js = require('./js/js');
const formatExt = require('./utils/formatExt');

// 获取输入值
const cwd = process.cwd();
const { argv } = yargs
  .options({
    dir: {
      describe: 'Check directory.',
      type: 'string'
    },
    ext: {
      describe: 'Extension name.',
      type: 'string'
    },
    test: {
      describe: 'Is it a test environment.',
      type: 'boolean'
    }
  });
const extStr = argv.ext;

// 检查代码
js({
  cwd: argv.file
    ? (path.isAbsolute(argv.dir) ? argv.dir : path.join(cwd, argv.dir))
    : cwd,
  ext: formatExt(extStr),
  test: argv.test
});