process.stdin.on("data", data => {
	const name = data.toString().trim().toUpperCase();
	if (name != "")
	{
		process.stdout.write(`Hello, ${name}!\n`);
	}
	else
	{
		process.stdout.write("Hello, World!\n");
	}
});
