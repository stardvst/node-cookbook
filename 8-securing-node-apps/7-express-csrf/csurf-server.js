const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csurf = require('csurf');

const app = express();
const csrf = csurf();

const mockUser = {
  username: 'user1',
  password: 'password123',
  email: "user1@example.com",
};

app.use(session({
  name: 'SESSIONID',
  secret: 'Node Cookbook',
  resave: false,
  saveUninitialized: false,
  // cookie: { // CSRF protection
  //   sameSite: 'strict',
  //   httpOnly: true,
  // },
}));
app.use(bodyParser.urlencoded({ extended: false }));

function renderLogin(res, message = '') {
  res.send(`
    <h1>Login</h1>
    ${message ? `<p style="color:red">${message}</p>` : ''}
    <form method="POST" action="/">
      <label>Username: <input type="text" name="username" /></label><br/>
      <label>Password: <input type="password" name="password" /></label><br/>
      <button type="submit">Login</button>
    </form>
  `);
}

app.get('/', (req, res) => {
  if(req.session && req.session.user) return res.redirect('/account');
  renderLogin(res, req.query.message);
});

app.post('/', (req, res) => {
  const { username, password } = req.body;

  if(username === mockUser.username && password === mockUser.password) {
    req.session.user = { username };
    return res.redirect('/account');
  }

  res.redirect('/');
});

app.get('/account', csrf, (req, res) => {
  if(!req.session.user) return res.redirect('/');

  res.send(`
    <h1>Account Details</h1>
    <p>Username: ${req.session.user.username}</p>
    <p>Email: ${mockUser.email}</p>
    <form method="POST" action="/update">
      <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
      <input type="text" name="email" value="${mockUser.email}" />
      <input type="submit" value="Update Email"/>
    </form>
    <form method="POST" action="/logout">
      <button type="submit">Logout</button>
    </form>
  `);
});

app.post('/update', csrf, (req, res) => {
  console.log(`Update attempt: user=${req.session && req.session.user ? req.session.user.username : 'none'} origin=${req.get('Origin') || req.get('Referer')} cookie=${!!req.headers.cookie}`);
  if(!req.session.user) return res.sendStatus(403);
  mockUser.email = req.body.email || mockUser.email;
  res.redirect('/account');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
