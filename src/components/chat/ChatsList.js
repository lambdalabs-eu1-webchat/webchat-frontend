import React from 'react';
import PropTypes from 'prop-types';

import TicketView from './TicketView';
import SearchInput from './SearchInput';
import searchMachine from './searchMachine';
import styled from 'styled-components';

class ChatsList extends React.Component {
  state = {
    inputField: '',
  };

  searchInputField = input => {
    this.setState({ inputField: input });
  };

  // ready for any input field clearing (button?)
  // will be deleted if not needed
  resetInputField = () => {
    this.setState({ inputField: '' });
  };
  render() {
    const { chatsArr, status } = this.props;

    const searchResult = searchMachine(chatsArr, this.state.inputField);

    return (
      <StyledDiv>
        <SearchInput status={status} searchInputField={this.searchInputField} />
        <TicketView chatsArr={searchResult} status={status} />
      </StyledDiv>
    );
  }
}

ChatsList.defaultProps = {
  chatsArr: [],
  status: '',
};

ChatsList.propTypes = {
  chatsArr: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
};

const StyledDiv = styled.div`
  border: none;
  margin: 0.625rem;
  padding: 0.625rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default ChatsList;
