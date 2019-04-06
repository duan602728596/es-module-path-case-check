const parseVueSFC = require('./parseVueSFC');
const parserCodeToAST = require('../js/parserCodeToAST');
const parseJsASTTree = require('../js/parseASTTree');
const parseCssASTTree = require('../css/parseASTTree');
const getParse = require('../css/getParse');
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
  const tree = parseJsASTTree(cwd, parseResult.dir, ast, ext); // 引用的文件，数组

  newItem.scriptType = type;
  newItem.tree.push(...tree);
}

/**
 * 解析vue文件内的css代码
 * @param { object } newItem
 * @param { string } code: 代码
 * @param { string } cwd: 目录位置
 * @param { object } parseResult: path.parse解析的绝对路径相关信息
 * @param { Array<string> } ext: 文件扩展名
 * @param { string } type: 解析类型
 */
function parseVueStyle(newItem, code, cwd, parseResult, ext, type) {
  const vueStyleExt = `.${ type === 'stylus' ? 'styl' : type }`;
  const parse = getParse(vueStyleExt);
  const ast = parse(code);
  const tree = parseCssASTTree(cwd, parseResult.dir, ast, ext, vueStyleExt);

  newItem.styleType = type;
  newItem.tree.push(...tree);
}

/**
 * 解析vue文件并获取vue的代码
 * @param { object } newItem
 * @param { string } absolute: 文件地址，绝对路径
 * @param { string } cwd: 目录位置
 * @param { object } parseResult: path.parse解析的绝对路径相关信息
 * @param { Array<string> } ext: 文件扩展名
 * @param { boolean } css: 检查css文件
 */
async function analyseVueFile(newItem, absolute, cwd, parseResult, ext, css) {
  const code = await readFile(absolute); // 读取代码
  const sfcResult = parseVueSFC(code);

  newItem.type = 'vue';
  newItem.tree = [];

  // 获取sfc的script代码
  if (sfcResult.script) {
    const { lang, content } = sfcResult.script;

    if (lang !== null) {
      parseVueScript(newItem, content, cwd, parseResult, ext, lang);
    }
  }

  // 获取sfc的style代码
  if (css && sfcResult.styles) {
    for (const style of sfcResult.styles) {
      const { lang, content } = style;

      if (lang !== null) {
        parseVueStyle(newItem, content, cwd, parseResult, ext, lang);
      }
    }
  }
}

module.exports = analyseVueFile;