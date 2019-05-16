import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import { SOCKET } from '../utils/paths';
const Logout = ({ logout, socket }) => {
  localStorage.clear();
  if (socket) {
    socket.emit(SOCKET.LOGOUT);
  }
  logout();
  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    socket: state.chats.socket,
  };
}

export default connect(
  mapStateToProps,
  { logout },
)(Logout);
