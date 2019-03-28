/* 错误信息 */
const errorMessage = [
  // 路径大小写错误
  {
    code: 0,
    msg: 'File case error.'
  },
  // 文件不存在
  {
    code: 1,
    msg: 'File does not exist.'
  },
  // 路径是一个目录
  {
    code: 2,
    msg: 'Path is a folder.'
  }
];

module.exports = errorMessage;