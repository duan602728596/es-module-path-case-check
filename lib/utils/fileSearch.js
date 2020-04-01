const util = require('util');
const glob = require('glob');

const globPromise = util.promisify(glob);

/**
 * 文件搜索
 * @param { string } cwd: 目录位置
 * @param { Array<string> } ext: 文件扩展名
 */
async function fileSearch(cwd, ext) {
  const options = {
    cwd,
    absolute: false,
    ignore: [
      'node_modules/**',
      '**/node_modules/**'
    ]
  };

  return await globPromise(`**/*.{${ ext.join(',') }}`, options);
}

module.exports = fileSearch;