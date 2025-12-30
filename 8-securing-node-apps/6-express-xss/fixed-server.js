const express = require('express');
const he = require('he');

const app = express();

app.get('/', (req, res) => {
  const { previous, lang, token } = req.query;

  getServiceStatus((status) => {
    const href = `${he.encode(previous || '')}${he.encode(token || '')}${he.encode(lang || '')}`;
    res.send(`
      <h1>Service Status</h1>
      <div id="status">${status}</div>
      <div>
        <a href="${href}">Go Back</a>
      </div>
    `);
  });
});

getServiceStatus = (callback) => {
  const status = 'All systems operational';
  callback(status);
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Example request to craft XSS attack:
// http://localhost:3000/?previous=%22%3E%3Cscript%3Edocument.getElementById(%22status%22).innerHTML=%22Hacked!%22;%3C/script%3E%20%3Ca%20href=%22/
