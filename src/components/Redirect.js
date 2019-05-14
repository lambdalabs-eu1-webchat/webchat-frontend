import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Redirct = ({ to }) => {
  return <Redirect to={to} />;
};

Redirct.propTypes = {
  route: PropTypes.string.isRequired,
};

export default Redirct;
