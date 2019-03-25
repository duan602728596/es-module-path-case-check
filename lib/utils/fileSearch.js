const glob = require('glob');

/**
 * 文件搜索
 * @param { string } cwd: 目录位置
 * @param { Array<string> } ext: 文件扩展名
 */
function fileSearch(cwd, ext) {
  const options = {
    cwd,
    absolute: false,
    ignore: 'node_modules/**'
  };

  return new Promise((resolve, reject) => {
    glob(`**/*.{${ ext.join(',') }}`, options, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  }).catch((err) => {
    console.error(err);
  });
}

module.exports = fileSearch;