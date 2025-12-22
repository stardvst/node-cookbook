const mysql = require('mysql2/promise');
require('dotenv').config();

// start docker with:
// docker run --publish 3306:3306 --name node-mysql --env MYSQL_ROOT_PASSWORD=root --detach mysql:latest

async function main() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: process.env.DB_MYSQL_USER,
      password: process.env.DB_MYSQL_PASSWORD,
    });

    console.log('DB connected');

    // Use IF NOT EXISTS to make repeated runs idempotent
    await connection.query('CREATE DATABASE IF NOT EXISTS tasks');
    await connection.query('USE tasks');

    await connection.query(`CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      task TEXT NOT NULL
    )`);

    // Use parameterized queries to avoid injection and duplicates are allowed here
    //await connection.query(`INSERT INTO tasks.tasks (task) VALUES (?)`, ['Learn Node.js']);
    //await connection.query(`INSERT INTO tasks.tasks (task) VALUES (?)`, ['Learn MySQL']);

    if(process.argv[2]) {
      // mysql handles sanitization with parameterized queries
      await connection.query(`INSERT INTO tasks.tasks (task) VALUES (?)`, [process.argv[2]]);
    }

    const [rows] = await connection.query('SELECT * FROM tasks.tasks');
    console.log(rows);

  } catch(err) {
    console.error('DB error', err);
    process.exitCode = 1;
  } finally {
    if(connection) {
      try {
        await connection.end();
      } catch(closeErr) {
        console.error('Error closing connection', closeErr);
      }
    }
  }
}

main();
