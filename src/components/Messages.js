import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import theme from './.././theme/styledTheme';

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
    const { tickets, guest, userType, status } = this.props;
    const guestName = guest.name;
    const GuestId = guest.id;
    return (
      <StyledMessages
        status={status}
        ref={el => {
          this.component = el;
        }}
      >
        {tickets.map((ticket, i) => (
          <div>
            <p>{`${guestName}'s ticket # ${i + 1}`}</p>
            <p>{`Status: ${ticket.status}`}</p>
            {status === CLOSED &&
            (userType === ADMIN || userType === SUPER_ADMIN) ? (
              ticket.rating ? (
                <RatingMessage rating={ticket.rating} />
              ) : (
                <p>No Rating given</p>
              )
            ) : null}
            {ticket.messages.map(message => (
              <Message key={message._id} message={message} guest_id={GuestId} />
            ))}
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
  overflow-y: scroll;
  margin-top: 1.5rem;
  flex: 1;
  div {
    p {
      font-size: ${theme.fontSize.message};
      margin: 0 1rem;
    }
  }
`;

export default Messages;
