import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from './../../theme/styledTheme';

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
  border: none;
  border-bottom: 1px solid ${theme.color.footerText};
  margin: 20px 0;
  height: ${theme.input.height};
  font-size: ${theme.fontSize.xxs};
  padding: 20px 0;
  border-radius: 0;
  &:focus {
    outline: none;
  }
`;

SearchInput.propTypes = {
  status: PropTypes.string.isRequired,
};

export default SearchInput;
