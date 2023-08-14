import React from 'react';
import './Login.css';

const Signup = () => {
  return (
    <div id="registration-container" class="container">
      <div class="title">Login</div>
      <div class="content">
        <form action="#">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Email</span>
              <input type="text" placeholder="Enter your email" required />
            </div>
            <div class="input-box">
              <span class="details">Password</span>
              <input type="text" placeholder="Enter your password" required />
            </div>
          </div>

          <div class="button">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
