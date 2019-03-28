module.exports = function() {
  // test1
  it('should be wrong that the path to the module2.js module of the index.js file', require('./test1/it'));

  // test2
  it('should be no error in test2', require('./test2/it'));

  // test3
  it('should module imported by import() will have an error', require('./test3/it'));
};