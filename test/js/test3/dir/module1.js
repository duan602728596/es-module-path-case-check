async function module1() {
  await import('./Module2'); // err
}

import('./module2');