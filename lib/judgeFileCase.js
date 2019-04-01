const errorMessage = require('./utils/errorMessage');

/* 判断文件大小写 */
function judgeFileCase(map) {
  map.forEach((value, key) => {
    const { tree = [] } = value;
    const newTree = [];

    for (const item of tree) {
      const { absolute, err } = item;

      // 文件在node_modules里面
      if (!absolute) continue;

      const newItem = { ...item };

      // 判断文件大小写错误
      if (!err) {
        const info = map.get(absolute.toLowerCase());

        if (!info || info.absolute !== absolute) {
          newItem.err = errorMessage[0];
        }
      }

      newTree.push(newItem);
    }

    map.set(key, {
      ...value,
      tree: newTree
    });
  });
}

module.exports = judgeFileCase;