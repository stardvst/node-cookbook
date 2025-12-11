const http = require('http');
const fs = require('fs');
const path = require('path');

const form = fs.readFileSync(path.join(__dirname, 'public', 'form.html'));

http
  .createServer((req, res) => {
	  if (req.method === 'GET')
	  {
		  get(res);
		  return;
	  }
	  if (req.method === 'POST')
	  {
		  post(req, res);
		  return;
	  }
	  error(res, 405);
  })
  .listen(3000, () => {console.log('Server listening on http://localhost:3000')});

function get(res)
{
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.end(form);
}

function post(req, res)
{
	console.log(req.headers['content-type'])
	if (req.headers['content-type'] !== 'application/json')
	{
		error(res, 415);
		return;
	}

	let input = '';
	req.on('data', chunk => { input += chunk.toString(); });

	req.on('end', () => {
		const data = JSON.parse(input);
		if (data.err)
		{
			error(res, 400);
			return;
		}
		console.log("Input:", data);
		res.end(`{"data": ${input}}`);
	});
}

function error(res, code)
{
	const msg = {error : http.STATUS_CODES[code]};
	res.statusCode = code;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(msg) + '\n');
}

// curl --header "Content-Type: application/json" --request POST --data '{"forename":"f","surname":"s"}' http://localhost:3000
