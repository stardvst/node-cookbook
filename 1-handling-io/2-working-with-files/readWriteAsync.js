const fs = require("fs");
const path = require("path");

setInterval(() => {
	process.stdout.write("*****\n"),
	1
}).unref();

function updateFile(filePath, upperContent)
{
	fs.writeFile(filePath, upperContent, "utf8", err => {
		if (err)
			return console.error(err);
		console.log("File updated.");
	});
}

const filePath = path.join(process.cwd(), "hello.txt");
fs.readFile(filePath, "utf8", (err, fileContent) => {
	if (err)
		return console.error(err);
	console.log("File content: ", fileContent.toString());

	const upperContent = fileContent.toString().toUpperCase();
	setTimeout(() => { updateFile(filePath, upperContent); }, 5);
});
