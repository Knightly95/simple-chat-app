import { describe, it, expect } from 'vitest';
import { getErrorMessage, ERROR_MESSAGES } from '../error';

describe('Error utilities', () => {
  describe('getErrorMessage', () => {
    it('returns error message when error is an Error instance', () => {
      const error = new Error('Test error');
      const result = getErrorMessage(error, 'Fallback message');

      expect(result).toBe('Test error');
    });

    it('returns fallback message when error is not an Error instance', () => {
      const error = 'Plain string error';
      const result = getErrorMessage(error, 'Fallback message');

      expect(result).toBe('Fallback message');
    });

    it('returns fallback message when error is null', () => {
      const result = getErrorMessage(null, 'Fallback message');

      expect(result).toBe('Fallback message');
    });

    it('returns fallback message when error is undefined', () => {
      const result = getErrorMessage(undefined, 'Fallback message');

      expect(result).toBe('Fallback message');
    });
  });

  describe('ERROR_MESSAGES', () => {
    it('contains expected error message constants', () => {
      expect(ERROR_MESSAGES.FETCH_MESSAGES_FAILED).toBe(
        'Failed to fetch messages'
      );
      expect(ERROR_MESSAGES.SEND_MESSAGE_FAILED).toBe('Failed to send message');
      expect(ERROR_MESSAGES.UNKNOWN_ERROR).toBe('An unknown error occurred');
    });
  });
});
