const path = require('path');
const fs = require('fs');
const fileExists = require('./fileExists');
const { extList, cssExtList } = require('./extList');
const errorMessage = require('./errorMessage');

/**
 * 路径判断
 * @param { string } value: 提取到的值
 * @param { string } dir: js文件目录
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 * @param loc: 文件位置
 * @param { boolean } css: 检查css文件
 */
function pathJudgment(value, dir, ext, loc, css) {
  // 扩展名列表
  const exts = [...extList, ...ext];

  if (css) exts.push(...cssExtList);

  const notInNodeModules = /^\.{1,2}/.test(value); // 判断是否为相对路径
  const extArr = Array.from(new Set(exts)); // 文件扩展名，为了获取其他类型的文件

  // 获取文件的真实路径，不包括node_modules里面的文件
  let pathFile = notInNodeModules ? fileExists(path.join(dir, value), extArr) : null;
  let isDir = pathFile === null ? false : fs.statSync(pathFile).isDirectory(); // 判断是否为目录

  // 当路径为目录时，判断是否有默认路径 /path/to/index
  if (notInNodeModules && isDir) {
    pathFile = fileExists(path.join(dir, value, 'index'), extArr);
    if (pathFile !== null) isDir = false;
  }

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