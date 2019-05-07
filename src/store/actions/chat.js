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
