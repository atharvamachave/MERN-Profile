const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
  res.send('hello from server router js');
});

//async await
router.post('/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: 'Fill all the fields' });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ error: 'Email already exists' });
    } else if (password != cpassword) {
      return res.status(422).json({ error: 'Password are not matching' });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });

      //Hashing password code present in models userSchema
      const userRegister = await user.save();

      res.status(201).json({ message: 'user registered successfully' });
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post('/signin', async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill the data' });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: 'Invalid credentials' });
      } else {
        res.json({ message: 'User signed in successfully' });
      }
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.log(err);
  }
});

// About us
router.get('/about', authenticate, (req, res) => {
  console.log('hello my about');
  res.send(req.rootUser);
});
//get yser data for contact us and home page
router.get('/getdata', authenticate, (req, res) => {
  console.log('hello my get data');
  res.send(req.rootUser);
});

// Logout
router.get('/logout', (req, res) => {
  console.log('hello my logout');
  res.clearCookie('jwtoken', { path: '/' });
  res.status(200).send('user logged out');
  // res.send(req.rootUser);
});

module.exports = router;
