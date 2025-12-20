const Router = require('koa-router');
const router = new Router();

router.get('/', async function(ctx) {
  const title = 'Koa.js Framework';
  ctx.body = `
    <html>
      <head><title>${title}</title></head>
      <link rel="stylesheet" href="styles.css">
      <body>
        <h1>${title}</h1>
        <p>Welcome to the Koa.js framework example!</p>
      </body>
    </html>
  `;
});

module.exports = router;
