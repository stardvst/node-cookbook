const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const title = 'Hello, Express!';
  res.send(`<html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <h1>${title}</h1>
      <p>This is a simple example of an Express application.</p>
    </body>
  </html>`);
});

module.exports = router;
