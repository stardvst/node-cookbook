const { Router } = require('express');
const fetch = require('node-fetch');

const router = Router();

router.get('/', async (req, res) => {
  fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(json => res.render('inventory', { books: json }))
    //.catch(err => res.render('error', { error: err, message: err.message }));
    .catch(err => res.status(500).send(`Internal server error: Error fetching books`));
});

router.post('/add', (req, res) => {
  console.log(req.body);

  fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  })
    .then(() => res.redirect('/inventory'))
    .catch(err => res.status(500).send(`Error adding book: ${err}`));
});

module.exports = router;
