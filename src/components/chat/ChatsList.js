import React from 'react';
import PropTypes from 'prop-types';

import TicketView from './TicketView';
import SearchInput from './SearchInput';
import searchMachine from './searchMachine';

class ChatsList extends React.Component {
  state = {
    inputField: '',
  };

  searchInputField = input => {
    this.setState({ inputField: input });
  };

  resetInputField = () => {
    this.setState({ inputField: '' });
  };

  render() {
    const { chatsArr, status } = this.props;

    const searchResult = searchMachine(chatsArr, this.state.inputField);
    // console.log('search result:', searchResult);
    return (
      <div style={divStyle}>
        <h3>{`${status.toUpperCase()} chats`}</h3>
        <SearchInput status={status} searchInputField={this.searchInputField} />
        <TicketView chatsArr={searchResult} status={status} />
      </div>
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

const divStyle = {
  border: '1px solid black',
  margin: '10px',
  padding: '10px',
};

export default ChatsList;
