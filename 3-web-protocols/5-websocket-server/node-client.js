const WebSocket = require('ws');

const wss = new WebSocket('ws://localhost:3000');

wss.on('open', (socket) => { console.log("Connected to server"); });

wss.on('message', (message) => { console.log(`Received: ${message}`); });

wss.on('error', (error) => { console.error(`WebSocket error: ${error}`); });

setInterval(() => { wss.send('Hello'); }, 3000);
