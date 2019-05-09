import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ status }) => {
  return <input placeholder={`Search ${status} tickets`} type="text" />;
};

SearchInput.propTypes = {
  status: PropTypes.string.isRequired,
};

export default SearchInput;
