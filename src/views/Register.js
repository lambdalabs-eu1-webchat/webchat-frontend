import React from 'react';
import { Redirect } from 'react-router-dom';
import { validate } from 'email-validator';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from './../theme/styledTheme';

import { connect } from 'react-redux';
import { registerUser, loginRequest } from '../store/actions/auth.js';

class Register extends React.Component {
  state = {
    newUser: {
      name: '',
      email: '',
      password: '',
      motto: '',
      hotelName: '',
      hotelMotto: '',
    },
    flashMessage: 'Please fill in all required fields',
  };

  clearInputs = () => {
    this.setState({
      newUser: {
        name: '',
        email: '',
        password: '',
        motto: '',
        hotelName: '',
        hotelMotto: '',
      },
      flashMessage: '',
    });
  };

  handleInput = event => {
    const input = event.target;
    this.setState(cState => ({
      newUser: {
        ...cState.newUser,
        [input.name]: input.value,
      },
    }));
  };

  setFlashMessage = flashMessage => {
    this.setState({
      flashMessage,
    });
  };

  handleLogin = () => {
    this.props.loginRequest(
      this.state.newUser.email,
      this.state.newUser.password,
    );
  };

  handleRegister = async event => {
    event.preventDefault();
    try {
      if (
        this.state.newUser.name &&
        this.state.newUser.email &&
        this.state.newUser.password &&
        this.state.newUser.hotelName
      ) {
        if (this.state.newUser.password.length > 6) {
          if (validate(this.state.newUser.email)) {
            const res = await this.props.registerUser({
              ...this.state.newUser,
            });
            if (res) {
              // const token = res.token;
              this.handleLogin();
              // this.clearInputs();
            } else {
              this.setFlashMessage(
                'Registration unsucessful, please try again',
              );
            }
          } else {
            this.setFlashMessage('Please use a valid email address');
          }
        } else {
          this.setFlashMessage('Passwords must be at least 7 characters');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <RegisterOuterWrapper>
        <RegisterWrapper>
          <form className="register-form">
            <h2>Register</h2>
            <label>Name*</label>
            <input
              name="name"
              type="text"
              value={this.state.newUser.name}
              onChange={this.handleInput}
            />
            <label>Email*</label>
            <input
              name="email"
              type="text"
              value={this.state.newUser.email}
              onChange={this.handleInput}
            />
            <label>Password*</label>
            <input
              name="password"
              type="password"
              value={this.state.newUser.password}
              onChange={this.handleInput}
            />
            <label>Motto</label>
            <input
              name="motto"
              type="text"
              value={this.state.newUser.motto}
              onChange={this.handleInput}
            />
            <label>Hotel Name*</label>
            <input
              name="hotelName"
              type="text"
              value={this.state.newUser.hotelName}
              onChange={this.handleInput}
            />
            <label>Hotel Motto</label>
            <input
              name="hotelMotto"
              type="text"
              value={this.state.newUser.hotelMotto}
              onChange={this.handleInput}
            />
            <p>
              {this.props.loading
                ? 'Registration in progress'
                : this.state.flashMessage}
            </p>
            <button type="submit" onClick={this.handleRegister}>
              Register
            </button>
          </form>
        </RegisterWrapper>
      </RegisterOuterWrapper>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { loggedIn: !!state.currentUser._id, loading: state.loading };
}

export default connect(
  mapStateToProps,
  { registerUser, loginRequest },
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
      background: ${theme.color.accentGreen};
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
