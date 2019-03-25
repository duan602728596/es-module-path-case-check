const path = require('path');
const childProcess = require('child_process');
const { expect } = require('chai');
const js = require('../lib/js/js');

describe('test', function() {
  // test1
  it('should be wrong that the path to the module2.js module of the index.js file', async function() {
    const map = await js({
      cwd: path.join(__dirname, 'test1'),
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
  });

  // test2
  it('should be no error in test2', async function() {
    const map = await js({
      cwd: path.join(__dirname, 'test2'),
      test: true
    });
    let errLen = 0;

    map.forEach((value, key) => {
      for (const item of value.tree) {
        const { err } = item;

        if (err) {
          errLen += 1;
        }
      }
    });

    expect(errLen).to.be.eql(0);
  });

  // test3
  function run() {
    const cli = path.join(__dirname, '../lib/cli');

    return new Promise((resolve, reject) => {
      const child = childProcess.spawn('node', [cli, '--dir="./test3"', '--ext="css"', '--test=true'], {
        cwd: __dirname
      });

      child.on('close', (code) => {
        resolve(child);
      });

      child.stdout.on('data', (data) => undefined);
      child.stderr.on('data', (data) => undefined);
    });
  }

  it('should cli will execute correctly', async function() {
    const child = await run();

    expect(!!child).to.be.true;
    child.kill(); // 结束进程
  });
});