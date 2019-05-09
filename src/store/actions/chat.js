import { CHATS } from './actionTypes';
import { DOMAIN, CHATS_CLOSED } from '../../utils/paths';

const {
  ADD_ACTIVE_CHATS,
  ADD_MESSAGE,
  ADD_QUEUED_CHAT,
  ADD_QUEUED_CHATS,
  REMOVE_QUEUED_CHAT,
  UPDATE_ACTIVE_CHAT,
  FETCH_CLOSED_CHATS,
  FETCH_CLOSED_CHATS_SUCCESS,
  FETCH_CLOSED_CHATS_FAILURE,
  SAVE_SOCKET,
} = CHATS;

export const saveSocket = socket => {
  if (!socket) {
    throw new Error('saveSocket requires socket');
  } else {
    return {
      type: SAVE_SOCKET,
      payload: socket,
    };
  }
};

export const addActiveChats = chatLogs => {
  if (!chatLogs) {
    throw new Error('addActiveChats requires chatLogs');
  }
  return {
    type: ADD_ACTIVE_CHATS,
    payload: chatLogs,
  };
};

export const addQueuedChats = chatLogs => {
  if (!chatLogs) {
    throw new Error('addQueuedChats requires chatLogs');
  }
  return {
    type: ADD_QUEUED_CHATS,
    payload: chatLogs,
  };
};

export const addQueuedChat = chatLog => {
  if (!chatLog) {
    throw new Error('addQueuedChat requires chatLog');
  }
  return {
    type: ADD_QUEUED_CHAT,
    payload: chatLog,
  };
};

export const removeQueuedChat = chat_id => {
  if (!chat_id) {
    throw new Error('addQueuedChat requires chatLog');
  }
  return {
    type: REMOVE_QUEUED_CHAT,
    target: chat_id,
  };
};

export const addMessage = (chat_id, message) => {
  if (!chat_id || !message) {
    throw new Error('addQueuedChat requires chat_id and message.');
  }
  return {
    type: ADD_MESSAGE,
    payload: message,
    target: chat_id,
  };
};

export const fetchClosedChats = id => async dispatch => {
  dispatch({ type: FETCH_CLOSED_CHATS });
  try {
    const result = await fetch(`${DOMAIN}${CHATS_CLOSED}?hotel_id=${id}`);
    const jsonResult = await result.json();
    dispatch(fetchAllClosedChatsSuccess(jsonResult));
  } catch (error) {
    dispatch(fetchAllClosedChatsFailure(error));
  }
};

export const fetchAllClosedChatsSuccess = chats => {
  if (!chats) {
    throw new Error('fetchAllClosedChatsSuccess requires a chats argument');
  }
  return {
    type: FETCH_CLOSED_CHATS_SUCCESS,
    payload: chats,
  };
};

export const fetchAllClosedChatsFailure = error => {
  if (!error) {
    throw new Error('fetchAllClosedChatsFailure requires an error argument');
  }
  return {
    type: FETCH_CLOSED_CHATS_FAILURE,
    payload: {
      error,
    },
  };
};
