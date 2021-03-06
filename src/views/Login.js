import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from './../theme/styledTheme';

import { messages } from '../utils/messages';
import { loginRequest } from '../store/actions/auth';
import Spinner from '../components/reusable/Spinner';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    flashMessage: messages.allRequiredFields,
  };

  handleInput = event => {
    const input = event.target;
    this.setState({
      [input.name]: input.value,
    });
  };

  setFlashMessage = flashMessage => {
    this.setState({
      flashMessage,
    });
  };

  handleLogin = async event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      const res = await this.props.loginRequest(
        this.state.email,
        this.state.password,
      );
      if (res.message) {
        this.setFlashMessage(res.message);
      }
    } else {
      this.setFlashMessage(messages.allRequiredFields);
    }
  };
  render() {
    if (!!this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <LoginOuterWrapper>
        <LoginWrapper>
          <form className="login-form">
            <h2>Login</h2>
            <label>Email*</label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleInput}
            />
            <label>Password*</label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInput}
            />
            <p>{this.state.flashMessage}</p>
            <button
              type="submit"
              onClick={this.handleLogin}
              disabled={this.props.loading.login}
            >
              {this.props.loading.login ? <Spinner /> : 'Login'}
            </button>
          </form>
        </LoginWrapper>
      </LoginOuterWrapper>
    );
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  numberRooms: PropTypes.number.isRequired,
  loading: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: !!state.currentUser._id,
    hotelHasZeroRooms: state.rooms.hotelHasZeroRooms,
    numberRooms: state.rooms.rooms.length,
    loading: state.loading,
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
      font-size: ${theme.fontSize.xs};
      color: ${theme.color.accentPurple};
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
    
    p {
      font-size: ${theme.fontSize.xs};
    }

    button {
      width: 100%;
      height: ${theme.button.height};
      font-size: ${theme.fontSize.xs};
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
        transition: all 0.3s ease;
      }
      &:focus {
        outline: none;
      }
    }
  }
`;
