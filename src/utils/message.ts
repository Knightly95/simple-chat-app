export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString();
};

export const isValidMessage = (message: string): boolean => {
  return message.trim().length > 0;
};
