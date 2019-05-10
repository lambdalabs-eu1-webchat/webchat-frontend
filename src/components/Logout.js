import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

const Logout = ({ logout }) => {
  localStorage.clear();
  logout();
  return <Redirect to='/' />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  { logout },
)(Logout);
