const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if(isMainThread) {
  const worker = new Worker(__filename, {
    workerData: "world"
  });
  worker.on('message', (msg) => {
    console.log(`Reeived from worker: ${msg}`);
  });
} else {
  const greeting = `Hello, ${workerData}!`;
  parentPort.postMessage(greeting);
}
