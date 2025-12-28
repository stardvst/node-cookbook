const { Router } = require('express');
const { comparePassword } = require('../lib/passwords');
const users = require('../data/users');
const router = Router();

router.get('/login', (req, res, next) => {
  res.render('login', { fail: false });
  next();
});

router.post('/login', (req, res, next) => {
  if(req.session.user) {
    res.redirect('/');
    next();
    return;
  }

  const user = users[req.body.username];
  if(user && comparePassword(req.body.password, user.passwordHash)) {
    req.session.user = { name: req.body.username };
    res.redirect('/');
    next();
    return;
  }

  res.render('login', { fail: true });
  next();
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
