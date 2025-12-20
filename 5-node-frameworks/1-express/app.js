const express = require('express');
const path = require('path');
const index = require('./routes/index');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
