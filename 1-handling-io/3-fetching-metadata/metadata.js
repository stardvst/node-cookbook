const fs = require("fs");

const file = process.argv[2];

function printMetadata(file)
{
	try
	{
		const fileStats = fs.statSync(file);
		console.log(fileStats);
	}
	catch (err)
	{
		console.error("Error reading file path:", file);
	}
}

function printSymlinkMetadata(file)
{
	try
	{
    const fileStats = fs.lstatSync(file);
		console.log(fileStats);
	}
	catch (err)
	{
		console.error("Error reading symlink:", file);
	}
}

function testAccess(file)
{
	try
	{
		fs.accessSync(file);
		console.log("File exists.");
		return true;
	}
	catch (err)
	{
		console.error("File does not exist.");
		return false;
	}
}

function chmod(file)
{
	try
	{
		if (!testAccess(file))
			return;

		fs.chmodSync(file, 0o755);
		console.log("File permissions changed.");
	}
	catch (err)
	{
		console.error("Error changing file permissions:", err);
	}
}

printMetadata(file);
testAccess(file);
chmod(file);
printSymlinkMetadata("link-to-file");
