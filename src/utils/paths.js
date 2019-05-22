export const DOMAIN = 'http://localhost:7000/';
// export const DOMAIN = 'https://web-chat-labs.herokuapp.com/';
export const GUEST_CLIENT_DOMAIN = 'https://webchatlabs-guest.netlify.com/';
export const LOGIN = 'api/auth/login';
export const REGISTER = 'api/auth/register';
export const USERS = 'api/users';
export const CHATS_CLOSED = 'api/chats/closed';
export const HOTEL = 'api/hotel';
export const SUBSCRIPTION = 'api/subscription';
export const METHOD = 'api/subscription/method';
export const TRANSLATE_CHAT = 'api/chats/translate';
export const EMAIL = 'api/email';

export const SOCKET = {
  CLOSE_TICKET: 'close_ticket',
  ASSIGN_SELF_TICKET: 'assign_self_ticket',
  LOGIN: 'login',
  LOGOUT: 'logout',
  FAILED_LOGIN: 'failed_login',
  QUEUED_CHATS: 'queued_chats',
  ACTIVE_CHATS: 'active_chats',
  CHATLOG: 'chat_log',
  MESSAGE: 'message',
  CONNECTION: 'connection',
  REMOVE_QUEUED: 'remove_queued',
  ADD_QUEUED: 'add_queued',
  QUEUED_MESSAGE: 'queued_message',
  TYPING: 'typing',
  STOPPED_TYPING: 'stopped_typing',
  CHECK_OUT: 'check_out'
};

export const APP_PATHS = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  TEAM_MEMBERS: '/team-members',
  BILLING: '/billing',
  CHAT: '/chat',
  ACCOUNT_SETTINGS: '/account-settings',
  CHECK_IN_OUT: '/check-in-out',
  COMPANY_DASH: '/company-dash',
  COMPANY_SETTINGS: '/company-settings'
};
