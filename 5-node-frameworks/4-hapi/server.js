const Hapi = require('@hapi/hapi');

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOSTNAME,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello, Hapi!';
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
