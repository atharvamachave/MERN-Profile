const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

//MongoDB Connection
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;

//Routes

// app.get('/about', middleware, (req, res) => {
//   res.send('hello from about');
// });
app.get('/contact', (req, res) => {
  // res.cookie('test', 'atharva');
  res.send('hello from contact');
});
app.get('/signin', (req, res) => {
  res.send('hello from signin');
});
app.get('/signup', (req, res) => {
  res.send('hello from signup');
});

app.listen(PORT, () => {
  console.log(`server is running on port no ${PORT}`);
});
