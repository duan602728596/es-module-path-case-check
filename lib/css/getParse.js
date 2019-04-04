const postcss = require('postcss');
const postcssLess = require('postcss-less');
const postcssSass = require('postcss-sass');
const postcssScss = require('postcss-scss');
const postStylusParser = require('postcss-stylus-parser').default;

/**
 * 获取解析器
 * @param { string } ext
 */
function getParse(ext) {
  const map = {
    '.css': postcss.parse,
    '.less': postcssLess.parse,
    '.sass': postcssSass.parse,
    '.scss': postcssScss.parse,
    '.styl': postStylusParser()
  };

  return map[ext] ? map[ext] : map['.css'];
}

module.exports = getParse;