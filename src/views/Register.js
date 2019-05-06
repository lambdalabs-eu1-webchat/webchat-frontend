import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const handleRegister = (event, registerUser) => {
  event.preventDefault();
  let name = '';
  let email = '';
  let password = '';
  let motto = '';
  let hotelName = '';
  let hotelMotto = '';

  event.target.parentNode.childNodes.forEach((childNode) => {
    if (childNode.name === 'name') {
     name = childNode.value;
    } else if (childNode.name === 'email') {
      email = childNode.value;
    } else if (childNode.name === 'password') {
      password = childNode.value;
    } else if (childNode.name === 'motto') {
      motto = childNode.value;
    } else if (childNode.name === 'hotelName') {
      hotelName = childNode.value;
    } else if (childNode.value === 'hotelMotto') {
      hotelMotto = childNode.value;
    }
  });
  let blank = false;
  if (name && email && password && hotelName) {
    registerUser(name, email, password, hotelName);
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
      } else if (childNode.name === 'email') {
        childNode.value ='';
      } else if (childNode.name === 'password') {
        childNode.value = '';
      } else if (childNode.name === 'motto') {
        childNode.value = '';
      } else if (childNode.name === 'hotelName') {
        childNode.value = '';
      } else if (childNode.name === 'hotelMotto') {
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
        <p>Email</p>
        <input name="email" placeholder="Your email..." type="text" />
        <p>Password</p>
        <input name="password" placeholder="Choose a password..." type="password" />
        <p>Motto</p>
        <input name="motto" placeholder="Your motto..." type="text" />
        <p>Hotel Name</p>
        <input name="hotelName" placeholder="Your hotel name..." type="text" />
        <p>Hotel Motto</p>
        <input name="hotelMotto" placeholder="Your hotel motto..." type="text" />
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
