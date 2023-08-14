import React from 'react';
import './Contact.css';

const Contact = () => {
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
                placeholder="Enter your email address"
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
