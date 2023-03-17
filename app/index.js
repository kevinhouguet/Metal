require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./routers');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(__dirname, '../public')));

app.use(router);

app.listen(port, () => {
  console.log(`Listenning on http://localhost:${port}`);
});
