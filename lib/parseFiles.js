const fileSearch = require('./utils/fileSearch');
const parseEachFile = require('./parseEachFile');
const judgeFileCase = require('./judgeFileCase');
const logOutput = require('./logOutput');
const extList = require('./utils/extList');

/**
 * @param { string } cwd: 目录位置
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 * @param { boolean } test: 是否为测试环境
 */
async function parseFiles({ cwd, ext = [], test }) {
  // 获取文件的相对路径
  const files = await fileSearch(cwd, Array.from(new Set([...extList, ...ext])));

  // 获取map
  const map = await parseEachFile(cwd, files, ext);

  // 检查文件大小写
  judgeFileCase(map);

  // 输出log
  !test && logOutput(map);

  return map;
}

module.exports = parseFiles;