const express = require('express');

const app = express();

app.get('/', (req, res) => {
  asyncWork(() => {

    // TypeError: (req.query.msg || "").toUpperCase is not a function
    // const upper = (req.query.msg || '').toUpperCase();

    // sanitize input
    let msg = req.query.msg || '';
    if(Array.isArray(msg)) {
      msg = msg.pop(); // get the last value
    }
    const upper = (msg || '').toUpperCase();

    res.send(`${upper}`);
  });
});

asyncWork = (cb) => {
  setTimeout(cb, 0);
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// curl http://localhost:3000/\?msg\=hello
// curl http://localhost:3000/\?msg\=hello\&msg\=world
