const colors = require('colors/safe');

/* 输出日志 */
function logOutput(map) {
  // 输出
  map.forEach((value, key) => {
    const { tree = [], file } = value;
    let consoleFile = false;

    for (const item of tree) {
      const { err, loc, value } = item;

      if (err) {
        // 输出文件的路径
        !consoleFile && console.log(colors.blue.bold(`file: ${ file } (${ key })`));
        consoleFile = true;

        // 输出错误信息
        console.log(
          colors.green(`  '${ value }'`),
          colors.yellow.bold(`(${ loc.start.line }, ${ loc.start.column })`),
          colors.yellow.bold(err.msg)
        );
      }
    }
  });

}

module.exports = logOutput;