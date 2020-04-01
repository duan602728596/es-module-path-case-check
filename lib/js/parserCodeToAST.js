const parser = require('@babel/parser');

/**
 * 根据代码解析成ast
 * @param { string } code: 代码
 * @param { string } type: 类型
 */
function parserCodeToAST(code, type = 'js') {
  const typeList = {
    js: [
      ['flow', { all: false }],
      'flowComments'
    ],
    ts: ['typescript']
  };

  const tree = parser.parse(code, {
    sourceType: 'module',
    plugins: [
      // Miscellaneous
      'estree',
      // Language extensions
      'jsx',
      ...typeList[type],
      // ECMAScript proposals
      'asyncGenerators',
      'bigInt',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      ['decorators', { decoratorsBeforeExport: true }],
      'doExpressions',
      'dynamicImport',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'functionBind',
      'functionSent',
      'importMeta',
      'logicalAssignment',
      'nullishCoalescingOperator',
      'numericSeparator',
      'objectRestSpread',
      'optionalCatchBinding',
      'optionalChaining',
      'partialApplication',
      ['pipelineOperator', { proposal: 'smart' }],
      'throwExpressions',
      'topLevelAwait'
    ]
  });

  return tree;
}

module.exports = parserCodeToAST;