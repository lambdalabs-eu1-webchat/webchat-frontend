import { CHATS } from './actionTypes';
import { DOMAIN, CHATS_CLOSED, TRANSLATE_CHAT } from '../../utils/paths';

const {
  ADD_ACTIVE_CHATS,
  ADD_MESSAGE,
  ADD_QUEUED_CHAT,
  ADD_QUEUED_CHATS,
  REMOVE_QUEUED_CHAT,
  FETCH_CLOSED_CHATS,
  FETCH_CLOSED_CHATS_SUCCESS,
  FETCH_CLOSED_CHATS_FAILURE,
  SAVE_SOCKET,
  SET_CURRENT_CHAT_ID,
  CLEAR_CURRENT_CHAT_ID,
  ADD_QUEUE_MESSAGE,
  ADD_CURRENT_TYPER,
  CLEAR_CURRENT_TYPER,
  UPDATE_TICKET_LANGUAGE,
  TRANSLATE_CHATS_FAILURE,
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

export const setCurrentChatId = (chat_id, status) => {
  return {
    type: SET_CURRENT_CHAT_ID,
    payload: { chat_id, status },
  };
};

export const addQueueMessage = ({ chat_id, message }) => {
  return {
    type: ADD_QUEUE_MESSAGE,
    payload: message,
    target: chat_id,
  };
};

export const clearCurrentChatId = () => {
  return {
    type: CLEAR_CURRENT_CHAT_ID,
  };
};

export const addCurrentTyper = ({ chat_id, user }) => {
  return {
    type: ADD_CURRENT_TYPER,
    target: chat_id,
    payload: user,
  };
};

export const clearCurrentTyper = chat_id => {
  return {
    type: CLEAR_CURRENT_TYPER,
    target: chat_id,
  };
};

export const translate = (text, ticket_id, language) => async dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: language
      ? JSON.stringify({ text, ticket_id, language })
      : JSON.stringify({ text, ticket_id }),
  };

  try {
    const response = await fetch(`${DOMAIN}${TRANSLATE_CHAT}`, config);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    dispatch(translateChatFailure(error));
  }
};

export const updateTicketLanguage = (chat_id, language) => {
  return {
    type: UPDATE_TICKET_LANGUAGE,
    target: chat_id,
    payload: language,
  };
};

export const translateChatFailure = error => {
  if (!error) {
    throw new Error('translateChatFailure requires an error argument');
  }
  return {
    type: TRANSLATE_CHATS_FAILURE,
    payload: {
      error,
    },
  };
};
