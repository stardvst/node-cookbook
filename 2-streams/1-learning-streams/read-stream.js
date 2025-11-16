const fs = require("fs");

const readStream = fs.createReadStream("./file.txt");

readStream.on("data", chunk => { console.log("Read chunk:", chunk.toString()); });
readStream.on("end", () => { console.log("Done reading file."); });
