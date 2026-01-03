To benchmark the server, run the following command in your terminal:

```
npm install -g autocannon 0x
NODE_ENV=production npm run flamegraph
autocannon --connections 100 --duration 20 http://localhost:3000
```

To inspect DevTools, run
```
npm run inspect
```
And open chrome://inspect#devices to start profiling.
