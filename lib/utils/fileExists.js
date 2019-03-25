const fs = require('fs');

/**
 * 获取文件的真实地址
 * @param { string } pathFile: 文件的绝对路径
 * @param { Array<string> } ext: 扩展名
 */
function fileExists(pathFile, ext) {
  let result = null;

  if (fs.existsSync(pathFile)) {
    result = pathFile;
  } else {
    for (const item of ext) {
      const f = `${ pathFile }.${ item }`;
      const isExists = fs.existsSync(f); // 判断文件是否存在

      if (isExists) {
        result = f;
        break;
      }
    }
  }

  return result;
}

module.exports = fileExists;