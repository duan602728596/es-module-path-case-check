describe('tests.js', function() {
  // test1
  it('should be wrong that the path to the module2.js module of the index.js file', require('./test1/test'));

  // test2
  it('should be no error in test2', require('./test2/test'));

  // test3
  it('should cli will execute correctly', require('./test3/test'));
});