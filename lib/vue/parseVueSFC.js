const vueTemplateCompiler = require('vue-template-compiler');
const componentCompilerUtils = require('@vue/component-compiler-utils');
const { getScriptLang, getStyleLang } = require('./getLang');

/**
 * 将vue代码解析成SFC
 * @param { string } code: 代码
 */
function parseVueSFC(code) {
  const result = componentCompilerUtils.parse({
    source: code,
    compiler: vueTemplateCompiler,
    needMap: false
  });

  return {
    script: result.script ? {
      lang: getScriptLang(result.script.lang),
      content: result.script.content
    } : null,
    styles: result.styles ? result.styles.map((style, index) => {
      return {
        lang: getStyleLang(style.lang),
        content: style.content || ''
      };
    }) : null
  };
}

module.exports = parseVueSFC;