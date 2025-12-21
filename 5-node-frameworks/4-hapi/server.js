const Hapi = require('@hapi/hapi');

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOSTNAME,
  });

  await server.register(require('@hapi/vision'));

  server.views({
    engines: {
      ejs: require('ejs'),
    },
    relativeTo: __dirname,
    path: 'views',
    defaultExtension: 'ejs',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.view('index', { title: 'Hello, Hapi!' });
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
