import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from '../store/actions/chat';
import Message from './Message';
import RatingMessage from './RatingMessage';
import { ADMIN, SUPER_ADMIN } from '../utils/userTypes';
import { CLOSED, QUEUED, ACTIVE } from '../utils/ticketStatus';

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
  translateTicket = ticket => {
    const textToTranslate = ticket.messages.map(msg => {
      return msg.text;
    });
    this.props.translate(textToTranslate, ticket._id, this.props.chat_id);
  };
  render() {
    const { tickets, guest, userType, status, translatedTickets } = this.props;
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
            <p>{`${guestName}'s ticket # ${i}`}</p>
            <p>{`Status: ${status}`}</p>
            <button onClick={() => this.translateTicket(ticket)}>
              Translate
            </button>
            {status === CLOSED &&
            (userType === ADMIN || userType === SUPER_ADMIN) ? (
              ticket.rating ? (
                <RatingMessage rating={ticket.rating} />
              ) : (
                <p>No Rating given</p>
              )
            ) : null}
            {ticket.messages.map((message, i) => (
              <Message
                key={message._id}
                message={message}
                guest_id={GuestId}
                translatedMessage={
                  translatedTickets[ticket._id]
                    ? translatedTickets[ticket._id][i]
                    : { detectedSourceLanguage: false }
                }
              />
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
`;

function mapStateToProps(state) {
  return {
    translatedTickets: state.chats.translatedTickets,
  };
}

export default connect(
  mapStateToProps,
  { translate },
)(Messages);
