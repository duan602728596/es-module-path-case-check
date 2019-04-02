const parserCodeToAST = require('./parserCodeToAST');
const parseASTTree = require('./parseASTTree');
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
async function analyseJsFile(newItem, absolute, cwd, parseResult, ext, type) {
  const code = await readFile(absolute); // 读取代码
  const ast = parserCodeToAST(code, type);
  const tree = parseASTTree(cwd, parseResult.dir, ast, ext); // 引用的文件，数组

  newItem.type = type;
  newItem.tree = tree;
}

module.exports = analyseJsFile;