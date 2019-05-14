import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

import Message from './Message';
import RatingMessage from './RatingMessage';
import { ADMIN, SUPER_ADMIN } from '../utils/userTypes';
import { CLOSED } from '../utils/ticketStatus';

class Messages extends React.Component {
  // pass in 'smooth' for smooth scroll
  scrollToBottom = behavior => {
    const scrollObject = { top: this.component.scrollHeight };
    if (behavior) scrollObject.behavior = behavior;
    this.component.scrollTo(scrollObject);
  };
  componentDidMount = () => {
    this.scrollToBottom();
  };
  componentDidUpdate = () => {
    this.scrollToBottom();
  };
  render() {
    const { tickets, guest_id, userType, status } = this.props;
    return (
      <StyledMessages
        ref={el => {
          this.component = el;
        }}
      >
        {tickets.map(ticket => (
          <div>
            {ticket.messages.map(message => (
              <Message
                key={message._id}
                message={message}
                guest_id={guest_id}
              />
            ))}
            {ticket.rating &&
            status === CLOSED &&
            (userType === ADMIN || userType === SUPER_ADMIN) ? (
              <RatingMessage rating={ticket.rating} />
            ) : null}
          </div>
        ))}
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
  height: 70vh;
  overflow-y: scroll;
`;

export default Messages;
