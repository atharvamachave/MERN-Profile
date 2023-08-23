import React, { useContext, useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Signup = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert('Invalid crednentials');
    } else {
      dispatch({ type: 'USER', payload: true });
      window.alert('Login successful');
      navigate('/');
    }
  };

  return (
    <div id="registration-container" class="container">
      <div class="title">Login</div>
      <div class="content">
        <form method="POST">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Email</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div class="input-box">
              <span class="details">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div class="button">
            <input type="submit" value="Login" onClick={loginUser} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
