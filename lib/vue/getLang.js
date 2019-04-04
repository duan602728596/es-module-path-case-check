/* 判断script标签的lang */
exports.getScriptLang = function getScriptLang(lang) {
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
};

/* 判断style标签的lang */
exports.getStyleLang = function getStyleLang(lang) {
  let formatLang = 'css';

  if (!lang) {
    return formatLang;
  }

  const lowerCaseLang = lang.toLowerCase();

  if (lowerCaseLang === 'less') {
    formatLang = 'less';

    return formatLang;
  }

  if (lowerCaseLang === 'sass') {
    formatLang = 'sass';

    return formatLang;
  }

  if (lowerCaseLang === 'scss') {
    formatLang = 'scss';

    return formatLang;
  }

  if (lowerCaseLang === 'styl' || lowerCaseLang === 'stylus') {
    formatLang = 'stylus';

    return formatLang;
  }

  return null;
};