function logger() {
  return async (ctx, next) => {
    console.log(`Request received: ${ctx.method} ${ctx.url}`);
    await next();
  };
}

module.exports = logger;
