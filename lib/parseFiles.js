const fileSearch = require('./utils/fileSearch');
const eachFile = require('./eachFile');
const judgeFileCase = require('./judgeFileCase');
const logOutput = require('./logOutput');
const { extList, cssExtList } = require('./utils/extList');

/**
 * @param { string } cwd: 目录位置
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 * @param { boolean } test: 是否为测试环境
 * @param { boolean } css: 检查css文件
 */
async function parseFiles({ cwd, ext = [], test, css }) {
  // 扩展名列表
  const exts = [...extList, ...ext];

  if (css) exts.push(...cssExtList);

  // 获取文件的相对路径
  const files = await fileSearch(cwd, Array.from(new Set(exts)));

  // 获取map
  const map = await eachFile({ cwd, files, ext, css });

  // 检查文件大小写
  judgeFileCase(map);

  // 输出log
  !test && logOutput(map);

  return map;
}

module.exports = parseFiles;