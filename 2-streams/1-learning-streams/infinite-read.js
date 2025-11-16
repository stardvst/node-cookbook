const fs = require("fs");

const readStream = fs.createReadStream("/dev/random");

let size = 0;
readStream.on("data", chunk => {
	size += chunk.length;
	console.log("Read bytes:", size);
});
