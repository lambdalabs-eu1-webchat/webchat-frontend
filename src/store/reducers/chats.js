import { CHATS } from '../actions/actionTypes';

const {
  ADD_ACTIVE_CHATS,
  ADD_MESSAGE,
  ADD_QUEUED_CHAT,
  ADD_QUEUED_CHATS,
  REMOVE_QUEUED_CHAT,
  UPDATE_ACTIVE_CHAT,
} = CHATS;

const initState = {
  queuedChats: [],
  activeChats: [],
};

const chats = (state = initState, action) => {
  switch (action.type) {
    case ADD_ACTIVE_CHATS:
      return { ...state, activeChats: action.payload };
    case ADD_QUEUED_CHATS:
      return { ...state, queuedChats: action.payload };
    default:
      return state;
  }
};

export default chats;
