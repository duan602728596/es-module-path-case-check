#!/usr/bin/env node

const process = require('process');
const path = require('path');
const yargs = require('yargs');
const parseFiles = require('./parseFiles');
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
    css: {
      describe: 'Allow parsing of css files.',
      type: 'boolean'
    },
    test: {
      describe: 'It is a test environment.',
      type: 'boolean'
    }
  });
const extStr = argv.ext;

// 检查代码
parseFiles({
  cwd: argv.dir
    ? (path.isAbsolute(argv.dir) ? argv.dir : path.join(cwd, argv.dir))
    : cwd,
  ext: formatExt(extStr),
  test: argv.test,
  css: argv.css
});