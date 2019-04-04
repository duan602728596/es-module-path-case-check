const getParse = require('./getParse');
const parseASTTree = require('./parseASTTree');
const readFile = require('../utils/readFile');

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
  const tree = parseASTTree(cwd, parseResult.dir, ast, ext, parseResult.ext);

  newItem.type = parseResult.ext.substr(1);
  newItem.tree = tree;
}

module.exports = analyseCssFile;