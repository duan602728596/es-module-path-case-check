const traverse = require('@babel/traverse').default;
const pathJudgment = require('../utils/pathJudgment');

/**
 * 解析js的ast树，提取出相对路径和绝对路径
 * @param { string } cwd: 目录位置
 * @param { string } dir: js文件目录
 * @param { object } ast: ast树
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 */
function parseASTTree(cwd, dir, ast, ext) {
  const results = [];

  traverse(ast, {
    // ES6模块加载：import fn from './module';
    ImportDeclaration(astPath) {
      const { node } = astPath;

      // value：文件相对路径 loc：代码位置
      const { value, loc } = node.source;
      const newItem = pathJudgment(value, dir, ext, loc);

      results.push(newItem);
    },

    // 异步加载模块：import('./module');
    CallExpression(astPath) {
      const { node } = astPath;
      const { callee } = node;
      const nodeArguments = node.arguments;

      if (callee.type === 'Import' && nodeArguments.length > 0) {
        const { value, loc } = nodeArguments[0];
        const newItem = pathJudgment(value, dir, ext, loc);

        results.push(newItem);
      }
    }
  });

  return results;
}

module.exports = parseASTTree;