const http = require('http');
const { STATUS_CODES } = http;

const Ajv = require('ajv');
const ajv = new Ajv();
const schema = {
  title: "Greeting",
  properties: {
    msg: { type: "string" },
    name: { type: "string" }
  }, additionalProperties: false,
  required: ["msg"]
};
const validate = ajv.compile(schema);

const server = http.createServer((req, res) => {
  if(req.method === 'POST' && req.url === '/') {
    greeting(req, res);
    return;
  }

  res.statusCode = 404;
  res.end(STATUS_CODES[res.statusCode]);
});

greeting = (req, res) => {
  let data = '';
  req.on('data', chunk => data += chunk);
  req.on('end', () => {
    try {
      data = JSON.parse(data);
    } catch(e) {
      res.end('');
      return;
    }

    // added validation step
    if(!validate(data, schema)) {
      res.end('Invalid input');
      return;
    }

    if(data.hasOwnProperty('name')) {
      res.end(`${data.msg} ${data.name}`);
    } else {
      res.end(`${data.msg}`);
    }
  });
}

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// curl -H "Content-Type: application/json" -X POST -d '{"msg":"Hello","name":"World"}' http://localhost:3000/

// TypeError: data.hasOwnProperty is not a function
// curl -H "Content-Type: application/json" -X POST -d '{"msg":"Hello","name":"World","hasOwnProperty":0}' http://localhost:3000/
