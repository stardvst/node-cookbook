const fs = require("fs");
const {Transform} = require("stream");

const rs = fs.createReadStream("./file.txt");
const ws = fs.createWriteStream("./file-copy.txt");

const uppercase = new Transform({
	transform(chunk, encoding, callback) {
		callback(null, chunk.toString().toUpperCase());
	}
});

rs.pipe(uppercase).pipe(ws);
