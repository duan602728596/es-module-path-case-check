const path = require('path');
const parserCodeToAST = require('./parse/parserCodeToAST');
const parseASTTree = require('./parse/parseASTTree');
const parseVueSFC = require('../vue/parseVueSFC');
const readFile = require('../utils/readFile');

/**
 * 解析文件
 * @param { object } newItem
 * @param { string } absolute: 文件地址，绝对路径
 * @param { string } cwd: 目录位置
 * @param { object } parseResult: path.parse解析的绝对路径相关信息
 * @param { Array<string> } ext: 文件扩展名
 * @param { string } type: 解析类型是javascript还是typescript
 */
async function analyseFile(newItem, absolute, cwd, parseResult, ext, type) {
  const code = await readFile(absolute); // 读取代码
  const ast = parserCodeToAST(code, type);
  const tree = parseASTTree(cwd, parseResult.dir, ast, ext); // 引用的文件，数组

  newItem.type = type;
  newItem.tree = tree;
}

/**
 * 解析vue文件
 * @param { object } newItem
 * @param { string } code: 代码
 * @param { string } cwd: 目录位置
 * @param { object } parseResult: path.parse解析的绝对路径相关信息
 * @param { Array<string> } ext: 文件扩展名
 * @param { string } type: 解析类型是javascript还是typescript
 */
function analyseVueFile(newItem, code, cwd, parseResult, ext, type) {
  const ast = parserCodeToAST(code, type);
  const tree = parseASTTree(cwd, parseResult.dir, ast, ext); // 引用的文件，数组

  newItem.type = 'vue';
  newItem.scriptType = type;
  newItem.tree = tree;
}

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
    const file = files[i]; // 文件名称
    const absolute = path.join(cwd, file); // 文件地址，绝对路径
    const parseResult = path.parse(absolute);
    const newItem = {
      file, // 文件地址，相对路径
      absolute
    };

    if (/.*\.m?jsx?$/.test(parseResult.ext)) {
      // 解析js或jsx
      await analyseFile(newItem, absolute, cwd, parseResult, ext, 'js');
    } else if (/.*\.tsx?$/.test(parseResult.ext)) {
      // 解析ts或tsx
      await analyseFile(newItem, absolute, cwd, parseResult, ext, 'ts');
    } else if (/.*\.vue$/.test(parseResult.ext)) {
      // 解析vue文件
      const code = await readFile(absolute); // 读取代码
      const sfcResult = parseVueSFC(code);

      // 获取sfc的script代码
      if (sfcResult) {
        const { lang, content } = sfcResult;

        if (lang === 'js' || lang === 'ts') {
          analyseVueFile(newItem, content, cwd, parseResult, ext, lang);
        } else {
          newItem.tree = [];
        }
      } else {
        newItem.tree = [];
      }
    } else {
      // 不解析其他文件，TODO：支持css
      newItem.tree = [];
    }

    // key为小写字母，便于将来进行文件路径的查找
    map.set(absolute.toLowerCase(), newItem);
  }

  return map;
}

module.exports = parseEachFile;