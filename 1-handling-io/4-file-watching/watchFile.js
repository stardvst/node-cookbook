const fs = require("fs");
const moment = require("moment");

const filePath = "./hello.txt";

fs.watchFile(filePath, (current, previous) => {
	const time = moment(current.mtime).format("MMM Do YYYY, h:mm:ss a");
	return console.log(`${filePath} file updated ${time}.`);
});
