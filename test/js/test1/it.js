const path = require('path');
const { expect } = require('chai');
const parseFiles = require('../../../lib/parseFiles');

module.exports = async function() {
  const map = await parseFiles({
    cwd: path.join(__dirname, 'dir'),
    test: true
  });
  let errLen = 0;

  map.forEach((value, key) => {
    for (const item of value.tree) {
      const { err } = item;

      if (err) {
        expect(item.value).to.be.eql('./MODULE2');
        errLen += 1;
      }
    }
  });

  expect(errLen).to.be.eql(1);
};