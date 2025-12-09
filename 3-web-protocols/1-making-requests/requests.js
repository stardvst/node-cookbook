const http = require('http');

http.get('http://www.example.com', (res) => res.pipe(process.stdout));

const payload = `{
  "name": "John Doe",
  "age": 30
}`;

const options = {
	method : 'POST',
	hostname : "postman-echo.com",
	path : "/post",
	headers : {'Content-Type' : 'application/json', 'Content-Length' : Buffer.byteLength(payload)}
};

const req = http.request(options, (res) => {
	process.stdout.write("Status Code: " + res.statusCode + "\n");
	process.stdout.write("Headers: " + JSON.stringify(res.headers) + "\n");
	process.stdout.write("Body: ");
	res.pipe(process.stdout);
});

req.on('error', (e) => { console.error(`Problem with request: ${e.message}`); });

req.write(payload);
req.end();
