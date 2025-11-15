const fs = require("fs").promises;
const path = require("path");

setInterval(() => {
	process.stdout.write("*****\n"),
	1
}).unref();

async function updateFile(filePath, upperContent)
{
	try
	{
		await fs.writeFile(filePath, upperContent, "utf8");
		console.log("File updated.");
	}
	catch (err)
	{
		console.error(err);
	}
}

async function run()
{
	try
	{
		const filePath = path.join(process.cwd(), "hello.txt");
		const fileContent = await fs.readFile(filePath, "utf8");
		console.log("File content: ", fileContent);
		const upperContent = fileContent.toUpperCase();
		setTimeout(async () => { await updateFile(filePath, upperContent); }, 5);
	}
	catch (err)
	{
		console.error(err);
	}
}

run();
