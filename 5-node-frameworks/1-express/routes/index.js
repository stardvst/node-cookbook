const express = require('express');
const router = express.Router();

function renderPage(name) {
  const title = 'Express';
  return `<html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>
      <h1>${title}</h1>
      <p>Welcome to ${title}, ${name ?? 'Guest'}!</p>
      <p>This is a simple example of an Express application.</p>
      <form method="post" action="/data">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        <br>
        <input type="submit" value="Submit">
      </form>
    </body>
  </html>`;
}

router.get('/', (req, res) => {
  res.send(renderPage());
});

router.get('/:name', (req, res) => {
  res.send(renderPage(req.params.name));
});

// comes from the form action attribute
router.post('/data', (req, res) => {
  res.redirect(`/${req.body.name}`);
});

module.exports = router;
