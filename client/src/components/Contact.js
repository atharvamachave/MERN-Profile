import React, { useEffect, useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [userData, setuserData] = useState({});

  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          'Content-Type': 'aplication/json',
        },
        // credentials: 'include',
      });

      const data = await res.json();
      console.log(data);
      setuserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  return (
    <div class="section_10">
      <div class="responsive-container-block container">
        <form id="contact-form">
          <div class="form-container">
            <div class="input-field">
              <label for="name" class="input-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="input"
                value={userData.name}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div class="input-field">
              <label for="email" class="input-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="input"
                value={userData.email}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div class="input-field">
              <label for="name" class="input-label">
                Contact No
              </label>
              <input
                type="text"
                id="name"
                name="name"
                class="input"
                value={userData.phone}
                placeholder="9999999999"
                required
              />
            </div>
            <div class="input-field">
              <label for="message" class="input-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                class="textinput"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-btn">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
