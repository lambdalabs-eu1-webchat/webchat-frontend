import { CHATS } from './actionTypes';

const {
  ADD_ACTIVE_CHATS,
  ADD_MESSAGE,
  ADD_QUEUED_CHAT,
  ADD_QUEUED_CHATS,
  REMOVE_QUEUED_CHAT,
  UPDATE_ACTIVE_CHAT,
} = CHATS;

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
