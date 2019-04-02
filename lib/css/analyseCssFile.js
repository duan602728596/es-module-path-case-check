const postcss = require('postcss');
const postcssLess = require('postcss-less');
const postcssSass = require('postcss-sass');
const postcssScss = require('postcss-scss');
const postStylus = require('poststylus');
const readFile = require('../utils/readFile');

/**
 * 获取解析器
 * @param { string } ext
 */
function getParse(ext) {
  const map = {
    '.css': postcss,
    '.less': postcssLess,
    '.sass': postcssSass,
    '.scss': postcssScss,
    '.styl': postStylus
  };

  return (map[ext] ? map[ext] : postcss).parse;
}

/**
 * 解析css文件
 * @param { object } newItem
 * @param { string } absolute: 文件地址，绝对路径
 * @param { string } cwd: 目录位置
 * @param { object } parseResult: path.parse解析的绝对路径相关信息
 * @param { Array<string> } ext: 文件扩展名
 */
async function analyseCssFile(newItem, absolute, cwd, parseResult, ext) {
  const parse = getParse(parseResult.ext);
  const code = await readFile(absolute); // 读取代码
  const ast = parse(code);

  newItem.type = parseResult.ext.substr(1);
  newItem.tree = [];
}

module.exports = analyseCssFile;