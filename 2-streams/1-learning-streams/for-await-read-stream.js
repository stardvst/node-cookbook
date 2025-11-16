const fs = require("fs");

const readStream = fs.createReadStream("./file.txt");

async function run()
{
	for await (const chunk of readStream)
	{
		console.log("Read chunk:", chunk.toString());
	}
	console.log("Done reading file.");
}

run();
