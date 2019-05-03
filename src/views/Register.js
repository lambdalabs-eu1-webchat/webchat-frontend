import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const handleRegister = (event, registerUser) => {
  event.preventDefault();
  let name = '';
  let hotelId = '';
  let password = '';
  let email = '';

  event.target.parentNode.childNodes.forEach((childNode) => {
    if (childNode.name === 'name') {
     name = childNode.value;
    } else if (childNode.name === 'hotelId') {
      hotelId = childNode.value;
    } else if (childNode.name === 'password') {
      password = childNode.value;
    } else if (childNode.name === 'email') {
      email = childNode.value;
    }
  });
  let blank = false;
  if (name && hotelId && password && email) {
    registerUser(name, hotelId, password, email);
  } else {
    blank = true;
  }

  if (blank) {
    event.target.parentNode.childNodes.forEach((childNode) => {
      if (childNode.getAttribute('id') === 'result-message') {
        childNode.textContent = 'Please fill in all the required fields.';
      }
    });
  } else {
    event.target.parentNode.childNodes.forEach((childNode) => {
      if (childNode.getAttribute('id') === 'result-message') {
        childNode.textContent = 'Successfully registered. Please log in to continue.';
      }
      if (childNode.name === 'name') {
        childNode.value = '';
      } else if (childNode.name === 'hotelId') {
        childNode.value ='';
      } else if (childNode.name === 'password') {
        childNode.value = '';
      } else if (childNode.name === 'email') {
        childNode.value = '';
      }
    });
  }
};

const Register = ({ loggedIn, registerUser }) => {
  if (loggedIn) {
    return <Redirect to ="/" />
  }
  return (
    <div className="register-wrapper">
      <form className="register-form">
        <h2>Register</h2>
        <p>Name</p>
        <input name="name" placeholder="Choose a name..." type="text" />
        <p>Hotel ID</p>
        <input name="hotelId" placeholder="Your hotel ID..." type="text" />
        <p>Password</p>
        <input name="password" placeholder="Choose a password..." type="password" />
        <p>Email</p>
        <input name="email" placeholder="Your email..." type="text" />
        <p id="result-message" />
        <button type="submit" onClick={(e) => handleRegister(e, registerUser)}>Register</button>
      </form>
    </div>
  )
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Register;
