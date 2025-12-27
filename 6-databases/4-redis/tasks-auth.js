const redis = require('redis');

const client = redis.createClient({
  socket: { host: '127.0.0.1', port: 6380 },
  password: 'PASSWORD'
});

const task = process.argv[2];
const TASKS_KEY = 'tasks';

// start docker with:
// docker run --publish 6380:6379 --name node-redis-pw --detach redis redis-server --requirepass PASSWORD

client.on('error', (err) => {
  console.error('Redis Client Error', err);
  process.exitCode = 1;
});

(async () => {
  // connect the client (redis v4 uses a promise-based API)
  await client.connect();

  if(task) {
    await addTask(task);
  }

  await listTasks();

  await client.quit();
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});

async function addTask(task) {
  const key = `Task:${Math.random().toString(32).replace('.', '')}`;
  // hmset was removed in redis v4 — use hSet with an object or field/value pairs
  await client.hSet(key, { task });
  console.log('added task', key);
}

async function listTasks() {
  const keys = await client.keys('Task:*');

  for(const key of keys) {
    const task = await client.hGetAll(key);
    console.log(key, task);
  }
}
