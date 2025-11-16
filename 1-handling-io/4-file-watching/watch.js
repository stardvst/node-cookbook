const fs = require("fs");
const moment = require("moment");

const filePath = "./hello.txt";

fs.watch(filePath, (eventType, filename) => {
	const time = moment().format("MMM Do YYYY, h:mm:ss a");
	return console.log(`${filePath} file updated ${time} with event type ${eventType}.`);
});
