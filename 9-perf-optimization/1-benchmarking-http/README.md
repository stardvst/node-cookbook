To benchmark the server, run the following command in your terminal:

```
npm install -g autocannon
autocannon --connections 100 --duration 20 http://localhost:3000
```

This will simulate 100 concurrent connections to the server and provide performance metrics.

POST method performance measurement:
```
autocannon --connections 100 --duration 20 --method POST --headers 'content-type=application/json' --body '{"hello":"world"}' http://localhost:3000
```
