import { describe, it, expect, beforeEach, vi } from 'vitest';
import { messageService } from '../messageService';
import { api } from '../api';
import type { Message, CreateMessageRequest } from '@/types/chat';

vi.mock('../api');

describe('messageService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getMessages', () => {
    it('fetches messages without params', async () => {
      const mockMessages: Message[] = [
        {
          _id: '1',
          message: 'Hello',
          author: 'John',
          createdAt: new Date('2026-02-08T10:00:00Z'),
        },
      ];

      vi.mocked(api.get).mockResolvedValue(mockMessages);

      const result = await messageService.getMessages();

      expect(api.get).toHaveBeenCalledWith('/messages', {
        params: undefined,
      });
      expect(result).toEqual(mockMessages);
    });

    it('throws error when API call fails', async () => {
      vi.mocked(api.get).mockRejectedValue(new Error('Network error'));

      await expect(messageService.getMessages()).rejects.toThrow(
        'Network error'
      );
    });
  });

  describe('createMessage', () => {
    it('creates a message successfully', async () => {
      const messageData: CreateMessageRequest = {
        message: 'New message',
        author: 'Test User',
      };

      const createdMessage: Message = {
        _id: 'new-id',
        message: 'New message',
        author: 'Test User',
        createdAt: new Date('2026-02-08T10:05:00Z'),
      };

      vi.mocked(api.post).mockResolvedValue(createdMessage);

      const result = await messageService.createMessage(messageData);

      expect(api.post).toHaveBeenCalledWith('/messages', messageData);
      expect(result).toEqual(createdMessage);
    });

    it('throws error when create fails', async () => {
      const messageData: CreateMessageRequest = {
        message: 'Test',
        author: 'User',
      };

      vi.mocked(api.post).mockRejectedValue(new Error('Failed to create'));

      await expect(messageService.createMessage(messageData)).rejects.toThrow(
        'Failed to create'
      );
    });
  });
});
