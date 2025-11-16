const {Readable} = require("stream");

async function* readStream()
{
	yield "Node.js";
	yield "is";
	yield "a";
	yield "JavaScript";
	yield "runtime";
}

const readable = Readable.from(readStream());

readable.on("data", chunk => { console.log("Read chunk:", chunk.toString()); });
readable.on("end", () => { console.log("Done reading stream."); });
