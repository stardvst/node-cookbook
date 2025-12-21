async function routes(fastify) {
  fastify.get('/', async (request, reply) => {
    return { message: 'Hello, Fastify!' };
  });
}

module.exports = routes;
