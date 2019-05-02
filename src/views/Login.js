import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const handleClick = loginRequest => (event) => {
  event.preventDefault();
  let name = '';
  let password = '';
  event.target.parentNode.childNodes.forEach((childNode) => {
    if (childNode.name === 'name') {
      name = childNode.value;
    } else if (childNode.name === 'password') {
      password = childNode.value;
    }
  });
  if (name && password) {
    loginRequest(name, password)
  }
};

const Login = ({ loggedIn, loginRequest }) => {
  if (loggedIn) {
    return <Redirect to ='/chat' />
  }
  return (
    <div className='login-wrapper'>
      <form className='login-form'>
        <h2>Login</h2>
        <p>Name</p>
        <input name='name' placeholder='Your name...' type='text' />
        <p>Password</p>
        <input name='password' placeholder='Your password...' type='password' />
        <button type='submit' onClick={handleClick(loginRequest)}>Login</button>
      </form>
      </div>
  )
};

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
