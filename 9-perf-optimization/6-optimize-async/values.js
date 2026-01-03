const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const numberOfValues = 1000;
const values = Array.from({ length: numberOfValues }, () => ({ value: Math.round(Math.random() * 100000) }));

(async function main() {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db('data');
    const collection = db.collection('values');
    await collection.insertMany(values);
    console.log(`${numberOfValues} values inserted successfully.`);
  } catch(err) {
    console.error('Database error:', err);
  } finally {
    if(client) {
      await client.close();
    }
  }
})();
