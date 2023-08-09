const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
  res.send('hello from server router js');
});

// Using promises

// router.post('/register', (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: 'Fill all the fields' });
//   }

//   User.findOne({ email: email })
//     .then((userExists) => {
//       if (userExists) {
//         return res.status(422).json({ error: 'Email already exists' });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: 'user registered successfully' });
//         })
//         .catch((err) => res.status(500).json({ error: 'Failed to register' }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

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
      // console.log(password);
      // console.log(cpassword);
      // const a = password === cpassword;
      // console.log(a);
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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill the data' });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

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

module.exports = router;
