const SMTPServer = require('smtp-server').SMTPServer;

const PORT = 4321;

const server = new SMTPServer({
  disabledCommands: ['STARTTLS', 'AUTH'],
  logger: true,
  onData(stream, session, callback) {
    let emailData = '';
    stream.on('data', (chunk) => {
      emailData += chunk.toString();
    });
    stream.on('end', () => {
      console.log('Received email data:\n', emailData);
      callback(null);
    });
  },
});

server.on('error', (err) => { console.error('Error occurred:', err); });

server.listen(PORT);
