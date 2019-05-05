import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Logout = ({ logout }) => {
  localStorage.clear();
  logout();
  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Logout;
