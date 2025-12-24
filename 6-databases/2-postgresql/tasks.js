// start docker with:
// docker run --publish 5432:5432 --name node-postgres --env POSTGRES_PASSWORD=root --detach postgres:latest

require('dotenv').config();

const pg = require('pg');
const db = new pg.Client(); // automatically uses env vars

const task = process.argv[2];

const CREATE_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL
  )`;

const INSERT_TASK_QUERY = `
  INSERT INTO tasks (task)
  VALUES ($1)`;

const SELECT_ALL_QUERY = `
  SELECT * FROM tasks`;

async function main() {
  try {
    await db.connect();
    console.log('DB connected');

    await db.query(CREATE_TABLE_QUERY);

    if(task) {
      await db.query(INSERT_TASK_QUERY, [task]);
    }

    const res = await db.query(SELECT_ALL_QUERY);
    console.log(res.rows);

  } catch(err) {
    console.error('DB error', err);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
}

main();
