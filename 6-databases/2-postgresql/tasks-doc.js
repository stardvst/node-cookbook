// start docker with:
// docker run --publish 5432:5432 --name node-postgres --env POSTGRES_PASSWORD=root --detach postgres:latest

require('dotenv').config();

const pg = require('pg');
const db = new pg.Client(); // automatically uses env vars

const task = process.argv[2];

const CREATE_TABLE_DOC_QUERY = `
  CREATE TABLE IF NOT EXISTS task_docs (
    id SERIAL PRIMARY KEY,
    doc jsonb NOT NULL
  )`;

const INSERT_TASK_DOC_QUERY = `
  INSERT INTO task_docs (doc)
  VALUES ($1)`;

const SELECT_ALL_DOC_QUERY = `
  SELECT * FROM task_docs`;

async function main() {
  try {
    await db.connect();
    console.log('DB connected');

    await db.query(CREATE_TABLE_DOC_QUERY);

    if(task) {
      await db.query(INSERT_TASK_DOC_QUERY, [task]);
    }

    const res = await db.query(SELECT_ALL_DOC_QUERY);
    console.log(res.rows);

  } catch(err) {
    console.error('DB error', err);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
}

main();
