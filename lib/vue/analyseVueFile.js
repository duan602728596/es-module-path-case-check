const parseVueSFC = require('./parseVueSFC');
const parserCodeToAST = require('../js/parserCodeToAST');
const parseASTTree = require('../js/parseASTTree');
const readFile = require('../utils/readFile');

/**
 * 解析vue文件内的js代码
 * @param { object } newItem
 * @param { string } code: 代码
 * @param { string } cwd: 目录位置
 * @param { object } parseResult: path.parse解析的绝对路径相关信息
 * @param { Array<string> } ext: 文件扩展名
 * @param { string } type: 解析类型是javascript还是typescript
 */
function parseVueScript(newItem, code, cwd, parseResult, ext, type) {
  const ast = parserCodeToAST(code, type);
  const tree = parseASTTree(cwd, parseResult.dir, ast, ext); // 引用的文件，数组

  newItem.type = 'vue';
  newItem.scriptType = type;
  newItem.tree = tree;
}

/**
 * 解析vue文件并获取vue的代码
 * @param { object } newItem
 * @param { string } absolute: 文件地址，绝对路径
 * @param { string } cwd: 目录位置
 * @param { object } parseResult: path.parse解析的绝对路径相关信息
 * @param { Array<string> } ext: 文件扩展名
 */
async function analyseVueFile(newItem, absolute, cwd, parseResult, ext) {
  const code = await readFile(absolute); // 读取代码
  const sfcResult = parseVueSFC(code);

  // 获取sfc的script代码
  if (sfcResult) {
    const { lang, content } = sfcResult;

    if (lang === 'js' || lang === 'ts') {
      parseVueScript(newItem, content, cwd, parseResult, ext, lang);
    } else {
      newItem.tree = [];
    }
  } else {
    newItem.tree = [];
  }
}

module.exports = analyseVueFile;