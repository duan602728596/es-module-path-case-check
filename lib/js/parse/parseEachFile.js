const path = require('path');
const parserCodeToAST = require('./parserCodeToAST');
const parseASTTree = require('./parseASTTree');
const readFile = require('../../utils/readFile');

/**
 * 解析每个文件到ast
 * @param { string } cwd: 目录位置
 * @param { Array<string> } files: 文件
 * @param { Array<string> } ext: 文件扩展名
 */
async function parseEachFile(cwd, files, ext) {
  /**
   * Map <string, {
   *   type: string;
   *   tree: Array<{
   *     value: string;
   *     loc: {
   *       start: { line: number; column: number; };
   *       end: { line: number; column: number; };
   *     };
   *     absolute: string;
   *     err: { code: number; msg: string; };
   *   }>;
   * }>
   */
  const map = new Map();

  for (let i = 0, j = files.length; i < j; i++) {
    const item = files[i]; // 文件名称
    const filePath = path.join(cwd, item); // 文件地址，绝对路径
    const parseResult = path.parse(filePath);
    const newItem = {
      file: item, // 文件地址，相对路径
      absolute: filePath
    };

    if (/.*\.m?jsx?$/.test(parseResult.ext)) {
      // 解析js或jsx
      const code = await readFile(filePath); // 读取代码
      const ast = parserCodeToAST(code);
      const tree = parseASTTree(cwd, parseResult.dir, ast, ext); // 引用的文件，数组

      newItem.type = 'js';
      newItem.tree = tree;
    } else if (/.*\.tsx?$/.test(parseResult.ext)) {
      // 解析ts或tsx
      const code = await readFile(filePath); // 读取代码
      const ast = parserCodeToAST(code, 'ts');
      const tree = parseASTTree(cwd, parseResult.dir, ast, ext); // 引用的文件，数组

      newItem.type = 'ts';
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