// About.js
import React, { useEffect, useState } from 'react';
import image from '../images/atharva.jpg';
import image1 from '../images/image1.jpg';
import './About.css';
import { NavLink, useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const [userData, setuserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'aplication/json',
        },
        credentials: 'include',
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
      navigate('/login');
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <div className="container emp-profile">
      <div className="row">
        <div className="col-md-4">
          <div className="profile-img">
            <img
              src={userData.name === 'Atharva Anand Machave' ? image : image1}
              alt="image"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="profile-head">
            <h5>{userData.name}</h5>
            <h6>{userData.work}</h6>
            <p className="profile-rating mt-3 mb-5">
              Rankings: <span>9/10</span>
            </p>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  href="#home"
                  role="tab"
                >
                  About
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                >
                  Timeline
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-2">
          <input
            type="submit"
            className="profile-edit-btn"
            name="btnAddMore"
            value="Edit Profile"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="profile-work">
            <p>Work Link</p>
            <a href="https://www.google.com" target="_atharva">
              LinkedIn
            </a>
            <br />
            <a href="https://www.google.com" target="_atharva">
              Instagram
            </a>
            <br />
            {/* Add more work links here */}
          </div>
        </div>
        <div className="col-md-7 pl-5 about-info">
          <div className="tab-content profile-tab" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row">
                <div className="col-md-5">
                  <label>User Id :</label>
                </div>
                <div className="col-md-6">
                  <p>{userData._id}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <label>Name :</label>
                </div>
                <div className="col-md-6">
                  <p>Atharva Machave</p>
                </div>
                <div className="col-md-5">
                  <label>Email :</label>
                </div>
                <div className="col-md-6">
                  <p>{userData.email}</p>
                </div>
                <div className="col-md-5">
                  <label>phone :</label>
                </div>
                <div className="col-md-6">
                  <p>{userData.phone}</p>
                </div>
                <div className="col-md-5">
                  <label>Profession :</label>
                </div>
                <div className="col-md-6">
                  <p>{userData.work}</p>
                </div>
              </div>
              {/* Add more about details here */}
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              {/* Add timeline content here */}
              <div className="row mt-3">
                <div className="col-md-5">
                  <label>Experience : </label>
                </div>
                <div className="col-md-6">
                  <p>Fresher</p>
                </div>
                <div className="col-md-5">
                  <label>Hourly Charges : </label>
                </div>
                <div className="col-md-6">
                  <p>10$/hr</p>
                </div>
                <div className="col-md-5">
                  <label>Total Projects : </label>
                </div>
                <div className="col-md-6">
                  <p>30</p>
                </div>
                <div className="col-md-5">
                  <label>English Level : </label>
                </div>
                <div className="col-md-6">
                  <p>Intermediate</p>
                </div>
                <div className="col-md-5">
                  <label>Avaliability : </label>
                </div>
                <div className="col-md-6">
                  <p>3 Months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
