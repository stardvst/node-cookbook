var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
