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
  try {
    const parse = getParse(parseResult.ext);
    const code = await readFile(absolute); // 读取代码
    // 当sass内有类似 \:global(.className)
    // 或 *key: value; (IE7) 这样的代码时会解析出错
    // 所以使用try catch避免出现错误
    // 当然，这样也会导致无法检查这个文件的错误
    const ast = parse(code);
    const tree = parseASTTree(cwd, parseResult.dir, ast, ext, parseResult.ext);

    newItem.type = parseResult.ext.substr(1);
    newItem.tree = tree;
  } catch (err) {
    newItem.type = parseResult.ext.substr(1);
    newItem.tree = [];
  }
}

module.exports = analyseCssFile;