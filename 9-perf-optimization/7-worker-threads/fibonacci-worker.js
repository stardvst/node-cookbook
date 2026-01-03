const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const n = 10;

const fib = (n) => {
  let a = 0, b = 1, next = 1, i = 2;
  for(; i <= n; i++) {
    next = a + b;
    a = b;
    b = next;
  }
  return next;
};

if(isMainThread) {
  const worker = new Worker(__filename, {
    workerData: n
  });
  worker.on('message', (msg) => {
    console.log(`The ${n}th Fibonacci number is ${msg}`);
  });
} else {
  parentPort.postMessage(fib(workerData));
}
