const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const title = 'Hello, Express!';
  res.render('index', { title, description: 'This is a simple example of an Express application.' });
});

module.exports = router;
