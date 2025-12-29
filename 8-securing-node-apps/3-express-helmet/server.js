const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, secure world!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// curl -I http://localhost:3000
