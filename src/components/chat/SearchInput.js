import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ status, searchInputField }) => {
  return (
    <input style={search}
      placeholder={`Search ${status} tickets`}
      type="text"
      onChange={event => searchInputField(event.target.value)}
    />
  );
};

const search = {
  width:'100%',

}

SearchInput.propTypes = {
  status: PropTypes.string.isRequired,
};

export default SearchInput;
