const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const { join } = require('path');

const index = require('./routes/index');
const auth = require('./routes/auth');

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  name: 'SESSIONID', // name of the cookie to store session ID
  secret: 'Node Cookbook', // signs the session ID cookie
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/auth', auth);

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
