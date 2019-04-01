const path = require('path');
const fs = require('fs');
const traverse = require('@babel/traverse').default;
const fileExists = require('../../utils/fileExists');
const extList = require('../../utils/extList');
const errorMessage = require('../../utils/errorMessage');

/**
 * 路径判断
 * @param { string } value: 提取到的值
 * @param { string } dir: js文件目录
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 * @param loc: 文件位置
 */
function pathJudgment(value, dir, ext, loc) {
  const notInNodeModules = /^\.{1,2}/.test(value); // 判断是否为相对路径
  const extArr = Array.from(new Set([...extList, ...ext])); // 文件扩展名，为了获取其他类型的文件

  // 获取文件的真实路径，不包括node_modules里面的文件
  const pathFile = notInNodeModules ? fileExists(path.join(dir, value), extArr) : null;
  const isDir = pathFile === null ? null : fs.statSync(pathFile).isDirectory(); // 判断是否为目录

  const newItem = {
    value,
    loc, // 代码位置
    absolute: pathFile // 绝对路径
  };

  /* 错误信息 */
  // 文件是否存在
  if (notInNodeModules && pathFile === null) {
    newItem.err = errorMessage[1];
  }

  // 文件是一个目录
  if (isDir) {
    newItem.err = errorMessage[2];
  }

  return newItem;
}

/**
 * 提取每个ast里面的树，提取出相对路径和绝对路径
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