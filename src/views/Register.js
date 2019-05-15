import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from './../theme/styledTheme';

import { connect } from 'react-redux';
import { registerUser } from '../store/actions/auth.js';
const handleRegister = (event, registerUser) => {
  event.preventDefault();
  let name = '';
  let email = '';
  let password = '';
  let motto = '';
  let hotelName = '';
  let hotelMotto = '';

  event.target.parentNode.childNodes.forEach(childNode => {
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
    } else if (childNode.name === 'hotelMotto') {
      hotelMotto = childNode.value;
    }
  });
  let blank = false;
  if (name && email && password && hotelName) {
    registerUser({ name, email, password, motto, hotelName, hotelMotto });
  } else {
    blank = true;
  }

  if (blank) {
    event.target.parentNode.childNodes.forEach(childNode => {
      if (childNode.getAttribute('id') === 'result-message') {
        childNode.textContent = 'Please fill in all the required fields.';
      }
    });
  } else {
    event.target.parentNode.childNodes.forEach(childNode => {
      if (childNode.getAttribute('id') === 'result-message') {
        childNode.textContent =
          'Successfully registered. Please log in to continue.';
      }
      if (childNode.name === 'name') {
        childNode.value = '';
      } else if (childNode.name === 'email') {
        childNode.value = '';
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
    return <Redirect to='/' />;
  }
  return (
      <RegisterOuterWrapper>
    <RegisterWrapper>
      <form className='register-form'>
        <h2>Register</h2>
        <label>Name*</label>
        <input name='name' type='text' />
        <label>Email*</label>
        <input name='email' type='text' />
        <label>Password*</label>
        <input
          name='password'
          type='password'
        />
        <label>Motto</label>
        <input name='motto' type='text' />
        <label>Hotel Name</label>
        <input name='hotelName' type='text' />
        <label>Hotel Motto</label>
        <input
          name='hotelMotto'
          type='text'
        />
        <p id='result-message' />
        <button type='submit' onClick={e => handleRegister(e, registerUser)}>
          Register
        </button>
      </form>
    </RegisterWrapper>
      </RegisterOuterWrapper>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { loggedIn: !!state.currentUser._id };
}

export default connect(
  mapStateToProps,
  { registerUser },
)(Register);

const RegisterOuterWrapper = styled.div`
background: ${theme.color.offWhite};
`;

const RegisterWrapper = styled.div`
  padding: 4% 0;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  form {
    margin: 0 auto;
    background: ${theme.color.white};
    padding: 30px;
    box-shadow: ${theme.shadow.cardShadow};
    width: 450px;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    @media (max-width: 600px) {
      width: 100%;
      margin: 0;
      padding-bottom: 65px; 
    }
    h2 {
      font-size: ${theme.fontSize.xl};
      padding: 20px 0;
      color: ${theme.color.textColor};
    }
    label {
      font-size: ${theme.fontSize.xxs};
      color: ${theme.color.accentPurple};
      font-weight: bold;
    }
  
    input {
      border: none;
      border-bottom: 1px solid ${theme.color.footerText};
      margin-bottom: 20px;
      height: ${theme.input.height};
      font-size: ${theme.fontSize.xs};
      padding: 20px 0;
      border-radius: 0;
      &:focus {
        outline: none;
      }
    }
  
    button {
      width: 100%;
      height: ${theme.button.height};
      font-size: ${theme.fontSize.s};
      border-radius: ${theme.border.radius};
      background:${theme.color.accentGreen};
      border: none;
      text-transform: ${theme.textTransform.uppercase};
      color: ${theme.color.white};
      font-weight: ${theme.fontWeight.bold};
      margin: 15px 0;
      box-shadow: ${theme.shadow.buttonShadow};
      &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
      }
    }
  }
`;
