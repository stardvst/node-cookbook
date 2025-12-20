const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const views = require('koa-views');
const index = require('./routes/index');

const PORT = process.env.PORT || 3000;

const app = new Koa();

/////////////////////////////////
// only for demo purposes

app.use(async (ctx, next) => {
  console.log('First middleware start.');
  await next();
  console.log('First middleware end.');
});

app.use(async (ctx, next) => {
  console.log('Second middleware start.');
  await next();
  console.log('Second middleware end.');
});

app.use(async (ctx, next) => {
  console.log('Third middleware start.');
  await next();
  console.log('Third middleware end.');
});

/////////////////////////////////

app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }));

app.use(serve(path.join(__dirname, 'public')));

app.use(index.routes());
app.use(index.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
