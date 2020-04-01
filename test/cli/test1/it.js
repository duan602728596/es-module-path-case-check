const path = require('path');
const childProcess = require('child_process');
const { expect } = require('chai');

function run() {
  const cli = path.join(__dirname, '../../../lib/cli');

  return new Promise((resolve, reject) => {
    const child = childProcess.spawn('node', [
      cli,
      '--dir="./dir"',
      '--ext="css"',
      '--test=true'
    ], {
      cwd: __dirname
    });

    child.on('close', (code) => {
      resolve(child);
    });

    child.stdout.on('data', (data) => undefined);
    child.stderr.on('data', (data) => undefined);
  });
}

module.exports = async function() {
  const child = await run();

  expect(!!child).to.be.true;
  child.kill(); // 结束进程
};