export const DOMAIN = 'http://localhost:7000/';
export const LOGIN = 'api/auth/login';
export const REGISTER = 'api/auth/register';
export const USERS = 'api/users';
export const CHATS_CLOSED = 'api/chats/closed';
export const HOTEL = 'api/hotel';
export const SUBSCRIPTION = 'api/subscription';
export const METHOD = 'api/subscription/method';


export const SOCKET = {
  CLOSE_TICKET: 'close_ticket',
  ASSIGN_SELF_TICKET: 'assign_self_ticket',
  LOGIN: 'login',
  FAILED_LOGIN: 'failed_login',
  QUEUED_CHATS: 'queued_chats',
  ACTIVE_CHATS: 'active_chats',
  CHATLOG: 'chat_log',
  MESSAGE: 'message',
  CONNECTION: 'connection',
  REMOVE_QUEUED: 'remove_queued',
  ADD_QUEUED: 'add_queued',
};
