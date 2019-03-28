const vueTemplateCompiler = require('vue-template-compiler');
const componentCompilerUtils = require('@vue/component-compiler-utils');

/* 判断lang */
function getLang(lang) {
  let formatLang = 'js';

  if (!lang) {
    return formatLang;
  }

  const lowerCaseLang = lang.toLowerCase();

  if (lowerCaseLang === 'js' || lowerCaseLang === 'javascript') {
    return formatLang;
  }

  if (lowerCaseLang === 'ts' || lowerCaseLang === 'typescript') {
    formatLang = 'ts';

    return formatLang;
  }

  return null;
}

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

  // 没有script
  if (!result.script) return null;

  const { lang, content } = result.script;

  return {
    lang: getLang(lang),
    content
  };
}

module.exports = parseVueSFC;