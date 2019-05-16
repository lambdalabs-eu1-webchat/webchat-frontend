import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from './../theme/styledTheme';
import { loginRequest } from '../store/actions/auth';

import { APP_PATHS } from '../utils/paths';

const handleClick = loginRequest => event => {
  event.preventDefault();
  let email = '';
  let password = '';
  event.target.parentNode.childNodes.forEach(childNode => {
    if (childNode.name === 'email') {
      email = childNode.value;
    } else if (childNode.name === 'password') {
      password = childNode.value;
    }
  });
  if (email && password) {
    loginRequest(email, password);
  }
};

const Login = ({ loggedIn, loginRequest, numberRooms }) => {
  if (numberRooms === 0 && loggedIn) {
    return (
      <Redirect to={APP_PATHS.COMPANY_DASH + APP_PATHS.COMPANY_SETTINGS} />
    );
  }
  if (!!loggedIn) {
    return <Redirect to="/chat" />;
  }
  return (
      <LoginOuterWrapper>
        <LoginWrapper>
          <form className="login-form">
            <h2>Login</h2>
            <label>Email*</label>
            <input name="email" type="text" />
            <label>Password*</label>
            <input name="password" type="password" />
            <button type="submit" onClick={handleClick(loginRequest)}>
              Login
            </button>
          </form>
        </LoginWrapper>
      </LoginOuterWrapper>

  );
};

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: !!state.currentUser._id,
    numberRooms: state.rooms.rooms.length,
  };
}

export default connect(
  mapStateToProps,
  { loginRequest },
)(Login);

const LoginOuterWrapper = styled.div`
  background: ${theme.color.offWhite};
  height: 100%;
  @media (max-width: 600px) {
    background: ${theme.color.white};
  }
`;

const LoginWrapper = styled.div`
  padding: 8rem 0;
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
      height: 100%;
      margin: auto 0;
      padding-bottom: 6.5rem; 
      align-self: center;
      
      box-shadow: none;
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
      &:focus {
      outline: none;
      }
    }
  }
`;
