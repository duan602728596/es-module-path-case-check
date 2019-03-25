const path = require('path');
const fs = require('fs');
const fileExists = require('../../utils/fileExists');

/**
 * 提取每个ast里面的树，提取出相对路径和绝对路径
 * @param { string } cwd: 目录位置
 * @param { string } dir: js文件目录
 * @param { object } ast: ast树
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 */
function parseASTTree(cwd, dir, ast, ext) {
  const { body } = ast.program;
  const results = [];

  body.forEach((item, index, array) => {
    // 判断ast是否为import
    if (item.type !== 'ImportDeclaration') return void 0;

    const {
      value, // 文件相对路径
      loc // 代码位置
    } = item.source;
    const notInNodeModules = /^\.{1,2}/.test(value); // 判断是否为相对路径
    const extArr = Array.from(new Set(['js', 'jsx', ...ext])); // 文件扩展名，为了获取其他类型的文件

    // 获取文件的真实路径，不包括node_modules里面的文件
    const pathFile = notInNodeModules ? fileExists(path.join(dir, value), extArr) : null;
    const isDir = pathFile === null ? null : fs.statSync(pathFile).isDirectory(); // 判断是否为目录

    const newItem = {
      value,
      loc,
      absolute: pathFile
    };

    /* 错误信息 */
    // 文件是否存在
    if (notInNodeModules && pathFile === null) {
      newItem.err = {
        err: 1,
        msg: 'File does not exist.'
      };
    }

    // 文件是一个目录
    if (isDir) {
      newItem.err = {
        err: 2,
        msg: 'Path is a folder.'
      };
    }

    results.push(newItem);
  });

  return results;
}

module.exports = parseASTTree;