const { MongoClient } = require('mongodb')

// start docker with:
// docker run --publish 27017:27017 --name node-mongo --detach mongo:latest

const express = require('express');
const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    const collection = await client.db('data').collection('values');

    const docs = await collection.find().toArray();
    const average = docs.reduce((sum, doc) => sum + doc.value, 0) / docs.length;

    app.get('/', async (req, res) => {
      res.send(`Average value: ${average}`);
    });
  }
  catch(err) {
    console.error('Database error:', err);
  } finally {
    await client.close();
  }
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
};

main().catch(err => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
