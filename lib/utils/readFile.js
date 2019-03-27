const fs = require('fs');

/* 读取文件 */
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  }).catch((err) => {
    console.error(err);
  });
}

module.exports = readFile;