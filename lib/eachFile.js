const path = require('path');
const analyseJsFile = require('./js/analyseJsFile');
const parseVueSFC = require('./vue/parseVueSFC');
const analyseVueFile = require('./vue/analyseVueFile');
const analyseCssFile = require('./css/analyseCssFile');

/**
 * 解析每个文件到ast
 * @param { string } cwd: 目录位置
 * @param { Array<string> } files: 文件
 * @param { Array<string> } ext: 文件扩展名
 * @param { boolean } css: 检查css文件
 */
async function eachFile(cwd, files, ext, css) {
  /**
   * Map <string, {
   *   type: string;
   *   file: string;
   *   absolute: string;
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
      await analyseJsFile(newItem, absolute, cwd, parseResult, ext, 'js');
    } else if (/.*\.tsx?$/.test(parseResult.ext)) {
      // 解析ts或tsx
      await analyseJsFile(newItem, absolute, cwd, parseResult, ext, 'ts');
    } else if (/.*\.vue$/.test(parseResult.ext)) {
      // 解析vue文件
      await analyseVueFile(newItem, absolute, cwd, parseResult, ext);
    } else if (css && /.*\.((c|sa|sc|le)ss|styl)$/.test(parseResult.ext)) {
      // css、less、sass、scss、stylus
      await analyseCssFile(newItem, absolute, cwd, parseResult, ext);
    } else {
      newItem.tree = [];
    }

    // key为小写字母，便于将来进行文件路径的查找
    map.set(absolute.toLowerCase(), newItem);
  }

  return map;
}

module.exports = eachFile;