import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCurrentChatId } from '../../store/actions/chat';
import { SOCKET } from '../../utils/paths';
import theme from '../../theme/styledTheme';
import styled from 'styled-components';
import Spinner from '../../components/reusable/Spinner';

const filterTickets = (tickets, filterCond) => {
  return tickets.filter(ticket => ticket.status === filterCond);
};

const TicketView = ({
  chatsArr,
  status,
  setCurrentChatId,
  socket,
  currentChatId,
  loading,
}) => {
  const handleChatSelect = chat_id => {
    // need to stop typing in current chat
    socket.emit(SOCKET.STOPPED_TYPING, currentChatId);
    // switch chats
    setCurrentChatId(chat_id, status);
  };

  // this.props.loading.fetchClosedChats && status === 'closed' ? <Spinner /> : other thing

  return (
    <>
      {loading.fetchClosedChats && status === 'closed' ? (
        <Spinner />
      ) : (
        <StyledTicketView>
          {chatsArr &&
            chatsArr.map(chat => {
              return (
                <StyledLineDiv
                  onClick={() => handleChatSelect(chat._id)}
                  key={chat._id}
                >
                  <StyledDiv>
                    <HeaderStyle>Guest Name: {chat.guest.name}</HeaderStyle>
                    <HeaderStyle>Room Number: {chat.room.name}</HeaderStyle>
                    {filterTickets(chat.tickets, status).map(ticket => {
                      return (
                        <div key={ticket._id}>
                          <div>
                            Last message:
                            {ticket.messages[ticket.messages.length - 1].text}
                          </div>
                        </div>
                      );
                    })}
                  </StyledDiv>
                </StyledLineDiv>
              );
            })}
        </StyledTicketView>
      )}
    </>
  );
};

TicketView.defaultProps = {
  chatsArr: [],
};

TicketView.propTypes = {
  chatsArr: PropTypes.array.isRequired,
  setCurrentChatId: PropTypes.func.isRequired,
};

const StyledTicketView = styled.div`
  overflow-y: scroll;
  height: 85%;
  @media (max-width: 600px) {
    height: 65%;
  }
`;

const StyledDiv = styled.div`
  background-color: ${theme.color.accentPurple};
  margin-bottom: 1rem;
  padding: 1.5rem;
  width: 100%;
  border-radius: 4px;
  color: white;
  font-weight: ${theme.fontWeight.light};
  font-size: ${theme.fontSize.xxs};
  &:hover {
    cursor: pointer;
    background: ${theme.color.hoverPurple};
  }
`;
const HeaderStyle = styled.div`
  font-weight: ${theme.fontWeight.bolder};
  color: ${theme.color.accentGreen};
  padding-bottom: 0.5rem;
`;

const StyledLineDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

function mapStateToProps(state) {
  return {
    socket: state.chats.socket,
    currentChatId: state.chats.currentChatIdAndStatus
      ? state.chats.currentChatIdAndStatus.chat_id
      : null,
    loading: state.loading,
  };
}

export default connect(
  mapStateToProps,
  { setCurrentChatId },
)(TicketView);
