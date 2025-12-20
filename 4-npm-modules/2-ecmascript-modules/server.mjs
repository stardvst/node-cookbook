import express from 'express';
import { name } from './get-name/index.mjs';

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello world from ${name}!`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
