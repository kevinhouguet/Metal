require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const router = require('./routers');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'a9541d825df6ecaa2f9dbdf2747a9eb1c09de70cfb47f26746530378c99acb715fb0acc72a053e45e0a8cf3959c0835ca6be0f74e2ea874fdb03be64359f604e',
  cookie: { maxAge: (1000 * 60 * 60) },
  resave: true,
  saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Listenning on http://localhost:${port}`);
});
