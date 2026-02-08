export const getErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  return error instanceof Error ? error.message : fallbackMessage;
};

export const ERROR_MESSAGES = {
  FETCH_MESSAGES_FAILED: 'Failed to fetch messages',
  SEND_MESSAGE_FAILED: 'Failed to send message',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;
