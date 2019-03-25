const fs = require('fs');
const path = require('path');
const parserCodeToAST = require('./parserCodeToAST');
const parseASTTree = require('./parseASTTree');

/* 读取文件 */
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  }).catch((err) => {
    console.error(err);
  });
}

/**
 * 解析每个文件到ast
 * @param { string } cwd: 目录位置
 * @param { Array<string> } files: 文件
 * @param { Array<string> } ext: 文件扩展名
 */
async function parseEachFile(cwd, files, ext) {
  const map = new Map();

  for (let i = 0, j = files.length; i < j; i++) {
    const item = files[i]; // 文件名称
    const filePath = path.join(cwd, item); // 文件地址，绝对路径
    const { dir, ext } = path.parse(filePath);
    const newItem = {
      file: item, // 文件地址，相对路径
      absolute: filePath
    };

    if (/.*\.jsx?$/.test(ext)) {
      // 解析js或jsx
      const code = await readFile(filePath); // 读取代码
      const ast = parserCodeToAST(code);
      const tree = await parseASTTree(cwd, dir, ast, ext); // 引用的文件，数组

      newItem.type = 'js';
      newItem.tree = tree;
    } else {
      // 不解析其他文件，TODO：支持css
      newItem.tree = [];
    }

    // key为小写字母，便于将来进行文件路径的查找
    map.set(filePath.toLowerCase(), newItem);
  }

  return map;
}

module.exports = parseEachFile;