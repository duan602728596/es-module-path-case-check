describe('test', function() {
  // test1
  it('should be wrong that the path to the module2.js module of the index.js file', require('./1'));

  // test2
  it('should be no error in test2', require('./2'));

  // test3
  it('should cli will execute correctly', require('./3'));
});