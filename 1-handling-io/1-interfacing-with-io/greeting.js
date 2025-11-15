process.stdin.on("data", data => {
	const name = data.toString().trim().toUpperCase();
	if (name != "")
	{
		process.stdout.write(`Hello, ${name}!\n`);
	}
	else
	{
		process.stderr.write("Name was empty.\n");
	}
});
