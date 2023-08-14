import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    // console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert('Registration Failed');
      console.log('Registration Failed');
    } else {
      window.alert('Registration Successful');
      console.log('Registration Successful');

      navigate('/login');
    }
  };

  return (
    <div id="registration-container" class="container">
      <div class="title">Registration</div>
      <div class="content">
        <form method="POST">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Full Name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleInputs}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Profession</span>
              <input
                type="text"
                name="work"
                placeholder="Enter your username"
                value={user.work}
                onChange={handleInputs}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Email</span>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInputs}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleInputs}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Phone Number</span>
              <input
                type="text"
                name="phone"
                placeholder="Enter your number"
                value={user.phone}
                onChange={handleInputs}
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Confirm Password</span>
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm your password"
                value={user.cpassword}
                onChange={handleInputs}
                required
              />
            </div>
          </div>

          <div class="button">
            <input
              type="submit"
              name="signup"
              id="signup"
              value="Register"
              onClick={postData}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
