/* 遍历数组 */
function eachNodes(nodes, opts) {
  for (const node of nodes) {
    const { type, nodes: childrenNodes } = node;

    // 执行相关函数
    if (opts[type]) {
      opts[type](node);
    }

    // 遍历子节点
    if (childrenNodes) {
      eachNodes(childrenNodes, opts);
    }
  }
}

/**
 * 遍历css的ast树
 * @param { object } ast: css的ast树
 * @param { object } opts: 相关配置和方法
 */
function traverseCss(ast, opts = {}) {
  const { nodes, type } = ast; // root nodes

  // 执行相关函数
  if (opts[type]) {
    opts[type](ast);
  }

  eachNodes(nodes, opts);
}

module.exports = traverseCss;