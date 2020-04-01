const traverseCss = require('./traverseCss');
const pathJudgment = require('../utils/pathJudgment');

/**
 * 解析css的ast树，提取出相对路径和绝对路径
 * @param { string } cwd: 目录位置
 * @param { string } dir: css文件目录
 * @param { object } ast: ast树
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 * @param { string } fileExt: 当前解析文件的扩展名
 */
function parseASTTree({ cwd, dir, ast, ext, fileExt }) {
  const results = [];

  traverseCss(ast, {
    decl(astPath) {
      const { value, source } = astPath;

      // 判断是否有url
      if (/url\(['"]?.+['"]?\)/i.test(value)) {
        const url = value.match(/url\(['"]?.+['"]?\)/i)[0];
        const formatUrl = url.replace(/url\(['"]?/ig, '')
          .replace(/['"]?\)/ig, '');

        const newItem = pathJudgment(formatUrl, dir, ext, source, true);

        results.push(newItem);
      } else if (fileExt === '.sass') {
        // postcss-sass的解析器会忽略url，所以要单独处理
        const url = /^['"].+['"]$/.test(value) ? value.substr(1, value.length - 2) : value;
        const newItem = pathJudgment(url, dir, ext, source, true);

        results.push(newItem);
      }
    }
  });

  return results;
}

module.exports = parseASTTree;