import { CHATS } from '../actions/actionTypes';

const {
  ADD_ACTIVE_CHATS,
  ADD_MESSAGE,
  ADD_QUEUED_CHAT,
  ADD_QUEUED_CHATS,
  REMOVE_QUEUED_CHAT,
  UPDATE_ACTIVE_CHAT,
  SAVE_SOCKET,
} = CHATS;

const initState = {
  queuedChats: [],
  activeChats: [],
  socket: null,
};

const chats = (state = initState, action) => {
  switch (action.type) {
    case SAVE_SOCKET:
      return { ...state, socket: action.payload };
    case ADD_ACTIVE_CHATS:
      return { ...state, activeChats: action.payload };
    case ADD_QUEUED_CHATS:
      return { ...state, queuedChats: action.payload };
    case ADD_QUEUED_CHAT:
      return {
        ...state,
        queuedChats: [...state.queuedChats, action.payload],
      };
    case REMOVE_QUEUED_CHAT:
      return {
        ...state,
        queuedChats: state.queuedChats.filter(
          chat => chat._id !== action.target,
        ),
      };
    case ADD_MESSAGE:
      return {
        ...state,
        activeChats: state.activeChats.map(chat => {
          if (chat._id === action.target) {
            const newTickets = JSON.parse(JSON.stringify(chat.tickets));
            newTickets[newTickets.length - 1].messages.push(action.payload);
            return { ...chat, tickets: newTickets };
          }
          return chat;
        }),
      };
    default:
      return state;
  }
};

export default chats;
