const fs = require('fs');
const http = require('http');
const path = require('path');
const formidable = require('formidable');

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
	if (!/multipart\/form-data/.test(req.headers['content-type']))
	{
		error(res, 415);
		return;
	}

	const form = new formidable.IncomingForm({
		multiples : true, // multiple file uploads
		uploadDir : path.join(__dirname, 'uploads'),
		keepExtensions : true
	});

	form.parse(req, (err, fields, files) => {
		if (err)
		{
			console.error('Error', err);
			error(res, 500);
			return;
		}
		res.writeHead(200, {'Content-Type' : 'application/json'});
		res.end(JSON.stringify({fields, files}, null, 2));
	});
}
