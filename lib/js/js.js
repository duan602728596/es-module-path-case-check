const fileSearch = require('../utils/fileSearch');
const parseEachFile = require('./parse/parseEachFile');
const judgeFileCase = require('./judgeFileCase');
const logOutput = require('./logOutput');

/**
 * @param { string } cwd: 目录位置
 * @param { Array<string> } ext: 文件扩展名，为了获取其他类型的文件
 * @param { boolean } test: 是否为测试环境
 */
async function js({ cwd, ext = [], test }) {
  // 获取文件的相对路径
  const files = await fileSearch(cwd, Array.from(new Set(['js', 'jsx', ...ext])));

  // 获取map
  const map = await parseEachFile(cwd, files, ext);

  // 检查文件大小写
  judgeFileCase(map);

  // 输出log
  !test && logOutput(map);

  // TODO: 自动修复错误地址
  return map;
}

module.exports = js;