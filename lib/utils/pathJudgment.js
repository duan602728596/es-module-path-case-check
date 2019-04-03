const path = require('path');
const fs = require('fs');
const fileExists = require('./fileExists');
const extList = require('./extList');
const errorMessage = require('./errorMessage');

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

module.exports = pathJudgment;