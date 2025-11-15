const fs = require("fs").promises;
const path = require("path");

setInterval(() => {
	process.stdout.write("*****\n"),
	1
}).unref();

function updateFile(filePath, upperContent)
{
	fs.writeFile(filePath, upperContent, "utf8")
		.then(() => { console.log("File updated."); })
		.catch(console.error);
}

const filePath = path.join(process.cwd(), "hello.txt");
fs.readFile(filePath, "utf8")
	.then((fileContent) => {
		console.log("File content: ", fileContent);
		const upperContent = fileContent.toUpperCase();
		setTimeout(() => { updateFile(filePath, upperContent); }, 5);
	})
	.catch(console.error);
