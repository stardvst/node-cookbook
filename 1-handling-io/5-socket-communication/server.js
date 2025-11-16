const net = require("net");
const HOSTNAME = "127.0.0.1";
const PORT = 3000;

const socket = net
				 .createServer(socket => {
					 socket.write("Client connected.\n");
					 socket.on("data", data => { console.log(`Hello, ${data}`); });
				 })
				 .listen(PORT, HOSTNAME);
