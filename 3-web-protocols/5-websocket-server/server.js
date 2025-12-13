const WebSocket = require('ws');

const wss = new WebSocket.Server({port : 3000}, () => { console.log('WebSocket server started on ws://localhost:3000'); });

wss.on('connection', (socket) => {
	socket.on('message', (message) => {
		console.log(`Received: ${message}`);
		if (message.toString() === 'Hello')
		{
			socket.send(`World!`);
		}
		else
		{
			socket.send(`${message}`);
		}
	});
});
