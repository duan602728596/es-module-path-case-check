const parser = require('@babel/parser');

/**
 * 根据代码解析成ast
 * @param { string } code: 代码
 */
function parserCodeToAST(code) {
  const tree = parser.parse(code, {
    sourceType: 'module',
    plugins: [
      'estree',
      [
        'flow',
        { all: false }
      ],
      'flowComments ',
      'jsx',
      'asyncGenerators',
      'bigInt',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      [
        'decorators',
        { decoratorsBeforeExport: true }
      ],
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
      [
        'pipelineOperator',
        { proposal: 'smart' }
      ],
      'throwExpressions'
    ]
  });

  return tree;
}

module.exports = parserCodeToAST;