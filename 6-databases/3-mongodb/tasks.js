const { MongoClient } = require('mongodb');

// start docker with:
// docker run --publish 27017:27017 --name node-mongo --detach mongo:latest

const task = process.argv[2];
const URI = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(URI);

async function main() {
  await client.connect();
  const tasks = client.db('tasklist').collection('tasks');

  try {
    if(task) {
      await tasks.insertOne({ task });
      console.log('New Task:', task);
    }

    const docs = await tasks.find().toArray();
    if(!docs.length) {
      console.log('No tasks found.');
    } else {
      docs.forEach(doc => console.log(doc));
    }
  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
