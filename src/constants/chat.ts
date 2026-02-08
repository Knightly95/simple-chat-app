export const CHAT_CONSTANTS = {
  AUTHOR_DEFAULT: 'User',
  EMPTY_STATE_MESSAGE: 'No messages yet. Start a conversation!',
  INPUT_PLACEHOLDER: 'Type your message...',
  MAX_INPUT_ROWS: 4,
} as const;

export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
} as const;

export const UI_CONSTANTS = {
  SCROLL_BEHAVIOR: 'smooth' as const,
  BORDER_RADIUS_SM: 2,
  MAX_MESSAGE_WIDTH: '70%',
} as const;

export const WEBSOCKET_CONFIG = {
  POLLING_INTERVAL_MS: 5000,
} as const;

export const STORAGE_KEYS = {
  CURRENT_USER: 'chat-user',
} as const;

export const POSITION_CONSTANTS = {
  TOGGLE_TOP: 16,
  TOGGLE_RIGHT: 16,
  Z_INDEX_TOGGLE: 1000,
} as const;

export const USER_CONFIG = {
  RANDOM_ID_MAX: 1000,
} as const;
