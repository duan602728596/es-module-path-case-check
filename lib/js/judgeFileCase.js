/* 判断文件大小写 */
function judgeFileCase(map) {
  map.forEach((value, key) => {
    const { tree, file, type } = value;
    const newTree = [];

    for (const item of tree) {
      const { absolute, err } = item;

      // 文件在node_modules里面
      if (!absolute) continue;

      const newItem = { ...item };

      // 判断文件大小写错误
      if (!err) {
        const info = map.has(absolute);

        if (!info) {
          newItem.err = {
            code: 0,
            msg: 'File case error.'
          };
        }
      }

      newTree.push(newItem);
    }

    map.set(key, {
      tree: newTree,
      file
    });
  });
}

module.exports = judgeFileCase;