import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const SearchInput = ({ status, searchInputField }) => {
  return (
    <StyledInput
      placeholder={`Search ${status} tickets`}
      type="text"
      onChange={event => searchInputField(event.target.value)}
    />
  );
};

const StyledInput = styled.input`
width:92%;
margin:2rem;
`;

SearchInput.propTypes = {
  status: PropTypes.string.isRequired,
};

export default SearchInput;
