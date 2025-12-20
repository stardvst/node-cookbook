const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const index = require('./routes/index');

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(serve(path.join(__dirname, 'public')));

app.use(index.routes());
app.use(index.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
