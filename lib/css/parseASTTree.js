const traverseCss = require('./traverseCss');
const pathJudgment = require('../utils/pathJudgment');

/**
 * 解析css的ast树，提取出相对路径和绝对路径
 * @param { string } cwd: 目录位置
 * @param { string } dir: css文件目录
 * @param { object } ast: ast树
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 */
function parseASTTree(cwd, dir, ast, ext) {
  const results = [];

  traverseCss(ast, {
    decl(astPath) {
      const { value, source } = astPath;

      // 判断是否有url
      if (/url\(['"]?.+['"]?\)/i.test(value)) {
        const url = value.match(/url\(['"]?.+['"]?\)/i)[0];
        const formatUrl = url.replace(/url\(['"]?/ig, '')
          .replace(/['"]?\)/ig, '');

        const newItem = pathJudgment(formatUrl, dir, ext, source);

        results.push(newItem);
      }
    }
  });

  return results;
}

module.exports = parseASTTree;