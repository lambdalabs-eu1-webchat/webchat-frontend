import { CHATS } from '../actions/actionTypes';

const {
  ADD_ACTIVE_CHATS,
  ADD_MESSAGE,
  ADD_QUEUED_CHAT,
  ADD_QUEUED_CHATS,
  REMOVE_QUEUED_CHAT,
  FETCH_CLOSED_CHATS_SUCCESS,
  SAVE_SOCKET,
  SET_CURRENT_CHAT_ID,
  CLEAR_CURRENT_CHAT_ID,
  ADD_QUEUE_MESSAGE,
  ADD_CURRENT_TYPER,
  CLEAR_CURRENT_TYPER,
  UPDATE_TICKET_LANGUAGE,
} = CHATS;

const initState = {
  queuedChats: [],
  activeChats: [],
  socket: null,
  currentChatIdAndStatus: null,
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
          chat => chat._id !== action.target
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
    case FETCH_CLOSED_CHATS_SUCCESS:
      return { ...state, closedChats: action.payload };
    case CLEAR_CURRENT_CHAT_ID:
      return { ...state, currentChatIdAndStatus: null };
    case SET_CURRENT_CHAT_ID:
      return { ...state, currentChatIdAndStatus: action.payload };
    case ADD_QUEUE_MESSAGE:
      return {
        ...state,
        queuedChats: state.queuedChats.map(chat => {
          if (chat._id === action.target) {
            const newTickets = JSON.parse(JSON.stringify(chat.tickets));
            newTickets[newTickets.length - 1].messages.push(action.payload);
            return { ...chat, tickets: newTickets };
          }
          return chat;
        }),
      };
    case ADD_CURRENT_TYPER:
      return {
        ...state,
        activeChats: state.activeChats.map(chat => {
          if (chat._id === action.target) {
            return { ...chat, typingUser: action.payload };
          }
          return chat;
        }),
        queuedChats: state.queuedChats.map(chat => {
          if (chat._id === action.target) {
            return { ...chat, typingUser: action.payload };
          }
          return chat;
        }),
      };

    case UPDATE_TICKET_LANGUAGE:
      return {
        ...state,
        activeChats: state.activeChats.map(chat => {
          if (chat._id === action.target) {
            const newTickets = JSON.parse(JSON.stringify(chat.tickets));
            newTickets[newTickets.length - 1].language = action.payload;
            return { ...chat, tickets: newTickets };
          }
          return chat;
        }),
      };

    case CLEAR_CURRENT_TYPER:
      return {
        ...state,
        activeChats: state.activeChats.map(chat => {
          if (chat._id === action.target) {
            return { ...chat, typingUser: null };
          }
          return chat;
        }),
        queuedChats: state.queuedChats.map(chat => {
          if (chat._id === action.target) {
            return { ...chat, typingUser: null };
          }
          return chat;
        }),
      };
    default:
      return state;
  }
};

export default chats;
