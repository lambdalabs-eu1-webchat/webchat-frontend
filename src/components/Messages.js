import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from '../store/actions/chat';
import theme from './.././theme/styledTheme';

import Message from './Message';
import RatingMessage from './RatingMessage';
import { ADMIN, SUPER_ADMIN } from '../utils/userTypes';
import { CLOSED } from '../utils/ticketStatus';
import titleCase from '../utils/titleCase';

class Messages extends React.Component {
  state = {
    numMessages: 0,
    chat_id: this.props.chat_id,
  };
  // pass in 'smooth' for smooth scroll
  scrollToBottom = behavior => {
    const scrollObject = { top: this.component.scrollHeight };
    if (behavior) scrollObject.behavior = behavior;
    this.component.scrollTo(scrollObject);
  };
  componentDidMount = () => {
    this.scrollToBottom();
    this.setState({
      numMessages: this.props.tickets.reduce(
        (total, ticket) => total + ticket.messages.length,
        0,
      ),
    });
  };
  componentDidUpdate = () => {
    const { numMessages, chat_id } = this.state;
    const newNumMessages = this.props.tickets.reduce(
      (total, ticket) => total + ticket.messages.length,
      0,
    );
    // handles when changing chat or new message
    if (chat_id !== this.props.chat_id) {
      this.setState({ chat_id: this.props.chat_id });
      this.scrollToBottom(); // not smooth scroll when changing chat
    }
    if (numMessages !== newNumMessages) {
      this.setState({ numMessages: newNumMessages });
      this.scrollToBottom('smooth'); // smooth scroll when a new message comes in
    }
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
            <p>{`${titleCase(guestName)}'s ticket # ${i + 1}`}</p>
            <p>{`Status: ${ticket.status}`}</p>

            {status === CLOSED &&
            (userType === ADMIN || userType === SUPER_ADMIN) ? (
              ticket.rating ? (
                <RatingMessage rating={ticket.rating} />
              ) : (
                <p>No Rating given</p>
              )
            ) : null}
            <button
              className="translate-button"
              onClick={() => this.translateTicket(ticket)}
            >
              Translate
            </button>
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
  margin-top: 1.5rem;
  flex: 1;
  .translate-button {
    margin: 0 1rem;
    height: ${theme.button.smallButton};
    font-size: ${theme.fontSize.xxs};
    border-radius: ${theme.border.radius};
    background: ${theme.color.accentGreen};
    border: none;
    text-transform: ${theme.textTransform.uppercase};
    color: ${theme.color.white};
    font-weight: ${theme.fontWeight.bold};
    box-shadow: ${theme.shadow.buttonShadow};
    &:hover {
      box-shadow: ${theme.shadow.buttonHover};
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
  }
  div {
    p {
      font-size: ${theme.fontSize.message};
      margin: 0 1rem;
    }
  }
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
