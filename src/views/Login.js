import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const handleClick = loginRequest => (event) => {
  event.preventDefault();
  let email = '';
  let password = '';
  event.target.parentNode.childNodes.forEach((childNode) => {
    if (childNode.name === 'email') {
      email = childNode.value;
    } else if (childNode.name === 'password') {
      password = childNode.value;
    }
  });
  if (email && password) {
    loginRequest(email, password)
  }
};

const Login = ({ loggedIn, loginRequest }) => {
  if (loggedIn) {
    return <Redirect to ="/chat" />
  }
  return (
    <div className="login-wrapper">
      <form className="login-form">
        <h2>Login</h2>
        <p>Email</p>
        <input name="email" placeholder="Your email..." type="text" />
        <p>Password</p>
        <input name="password" placeholder="Your password..." type="password" />
        <button type="submit" onClick={handleClick(loginRequest)}>Login</button>
      </form>
      </div>
  )
};

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
