const _ = require('lodash');

/**
 * 格式化字符串
 * @param { string } extStr: 字符串
 */
function formatExt(extStr) {
  if (typeof extStr !== 'string') {
    return [];
  }

  const extArr = extStr.split(/\s*,\s*/g);

  return _.without(extArr, '');
}

module.exports = formatExt;