const http = require('http');

const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 0; // 0 will assign a random port

const server = http.createServer((req, res) => {
	if (req.method !== 'GET')
		return error(res, 405);
	if (req.url === '/todo')
		return todo(res);
	if (req.url === '/')
		return index(res);
	return error(res, 404);
});

function index(res)
{
	const obj = {name : "Sample HTTP Server", version : "1.0.0"};
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(obj) + '\n');
}

function todo(res)
{
	const todo = {id : 1, title : "Learn Node.js", completed : false};
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(todo));
}

function error(res, code)
{
	const msg = {error : http.STATUS_CODES[code]};
	res.statusCode = code;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(msg) + '\n');
}

server.listen(PORT, HOSTNAME, () => { console.log(`Server running at http://${HOSTNAME}:${server.address().port}/`); });
