const fastify = require('fastify')({ logger: true });

const PORT = process.env.PORT || 3000;

fastify.register(require('./plugins/hello-route'));

const startServer = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Fastify server is running on ${fastify.server.address().port}`);
  } catch(err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
