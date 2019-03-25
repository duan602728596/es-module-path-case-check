/**
 * 格式化字符串
 * @param { string } extStr: 字符串
 */
function formatExt(extStr) {
  if (typeof extStr !== 'string') {
    return [];
  }

  const extArr = extStr.split(/\s*,\s*/g);

  for (let i = extArr.length - 1; i >= 0; i--) {
    if (extArr[i] === '') {
      extArr.splice(i, 1);
    }
  }

  return extArr;
}

module.exports = formatExt;