const net = require("net");
const HOSTNAME = "127.0.0.1";
const PORT = 3000;

const socket = net.connect(PORT, HOSTNAME);

socket.on("data", data => {
  console.log(`Received from server: ${data}`);
});

socket.write("world!\n");
