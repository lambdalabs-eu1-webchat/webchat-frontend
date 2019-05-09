import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ status, searchInputField }) => {
  return (
    <input
      placeholder={`Search ${status} tickets`}
      type="text"
      onChange={event => searchInputField(event.target.value)}
    />
  );
};

SearchInput.propTypes = {
  status: PropTypes.string.isRequired,
};

export default SearchInput;
