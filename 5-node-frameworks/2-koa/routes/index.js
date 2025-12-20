const Router = require('koa-router');
const router = new Router();

router.get('/', async function(ctx) {
  ctx.state = {
    title: 'Koa.js Framework'
  };
  await ctx.render('index');
});

module.exports = router;
