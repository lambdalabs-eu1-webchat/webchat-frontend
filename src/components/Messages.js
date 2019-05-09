import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import Message from './Message';

class Messages extends React.Component {
  scrollToBottom = scrollParams => {
    this.messagesEnd.scrollIntoView(scrollParams); //{ behavior: 'smooth' }
  };
  componentDidMount = () => {
    this.scrollToBottom();
  };
  componentDidUpdate = () => {
    this.scrollToBottom();
  };
  render() {
    const { tickets, guest_id } = this.props;
    return (
      <StyledMessages>
        {tickets.map(ticket =>
          ticket.messages.map(message => (
            <Message key={message._id} message={message} guest_id={guest_id} />
          )),
        )}
        <div
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </StyledMessages>
    );
  }
}

Messages.propTypes = {
  tickets: propTypes.arrayOf(
    propTypes.shape({
      _id: propTypes.string.isRequired,
      messages: propTypes.arrayOf(
        propTypes.shape({
          _id: propTypes.string.isRequired,
          sender: propTypes.shape({
            id: propTypes.string.isRequired,
            name: propTypes.string.isRequired,
          }).isRequired,
          text: propTypes.string.isRequired,
        }),
      ),
      status: propTypes.string.isRequired,
    }),
  ).isRequired,
  guest_id: propTypes.string.isRequired,
};

const StyledMessages = styled.div`
  height: 90vh;
  overflow-y: scroll;
`;

export default Messages;
