module.exports = function() {
  // test1
  it('should three errors within the script of the vue files', require('./test1/it'));

  // test2
  it('should five errors within the style of the vue files', require('./test2/it'));
};