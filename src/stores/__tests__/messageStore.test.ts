import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useMessageStore } from '../messageStore';
import { messageService } from '@/services/messageService';
import type { Message } from '@/types/chat';

vi.mock('@/services/messageService');

describe('messageStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useMessageStore.setState({
      messages: [],
      loading: false,
      error: null,
    });
  });

  describe('fetchMessages', () => {
    it('fetches messages successfully and updates state', async () => {
      const mockMessages: Message[] = [
        {
          _id: '1',
          message: 'Test message',
          author: 'John',
          createdAt: new Date('2026-02-08T10:00:00Z'),
        },
        {
          _id: '2',
          message: 'Another message',
          author: 'Jane',
          createdAt: new Date('2026-02-08T10:01:00Z'),
        },
      ];

      vi.mocked(messageService.getMessages).mockResolvedValue(mockMessages);

      const { fetchMessages } = useMessageStore.getState();
      await fetchMessages();

      const state = useMessageStore.getState();
      expect(state.messages).toEqual(mockMessages);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('sets loading to true while fetching', async () => {
      vi.mocked(messageService.getMessages).mockImplementation(
        () =>
          new Promise((resolve) => {
            const state = useMessageStore.getState();
            expect(state.loading).toBe(true);
            resolve([]);
          })
      );

      const { fetchMessages } = useMessageStore.getState();
      await fetchMessages();
    });

    it('handles fetch errors and updates error state', async () => {
      const errorMessage = 'Network error';
      vi.mocked(messageService.getMessages).mockRejectedValue(
        new Error(errorMessage)
      );

      const { fetchMessages } = useMessageStore.getState();
      await fetchMessages();

      const state = useMessageStore.getState();
      expect(state.error).toBe(errorMessage);
      expect(state.loading).toBe(false);
      expect(state.messages).toEqual([]);
    });

    it('passes params to messageService.getMessages', async () => {
      vi.mocked(messageService.getMessages).mockResolvedValue([]);

      const { fetchMessages } = useMessageStore.getState();
      await fetchMessages({ limit: 10, after: 'cursor123' });

      expect(messageService.getMessages).toHaveBeenCalledWith({
        limit: 10,
        after: 'cursor123',
      });
    });
  });

  describe('sendMessage', () => {
    it('sends message successfully and adds to state', async () => {
      const newMessage: Message = {
        _id: '3',
        message: 'New message',
        author: 'Test User',
        createdAt: new Date('2026-02-08T10:02:00Z'),
      };

      vi.mocked(messageService.createMessage).mockResolvedValue(newMessage);

      const { sendMessage } = useMessageStore.getState();
      await sendMessage({ message: 'New message', author: 'Test User' });

      const state = useMessageStore.getState();
      expect(state.messages).toContain(newMessage);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('handles send message errors and updates error state', async () => {
      const errorMessage = 'Failed to send';
      vi.mocked(messageService.createMessage).mockRejectedValue(
        new Error(errorMessage)
      );

      const { sendMessage } = useMessageStore.getState();
      await sendMessage({ message: 'Test', author: 'User' });

      const state = useMessageStore.getState();
      expect(state.error).toBe(errorMessage);
      expect(state.loading).toBe(false);
    });

    it('adds message to existing messages array', async () => {
      const existingMessage: Message = {
        _id: '1',
        message: 'Existing',
        author: 'John',
        createdAt: new Date('2026-02-08T10:00:00Z'),
      };

      useMessageStore.setState({ messages: [existingMessage] });

      const newMessage: Message = {
        _id: '2',
        message: 'New',
        author: 'Jane',
        createdAt: new Date('2026-02-08T10:01:00Z'),
      };

      vi.mocked(messageService.createMessage).mockResolvedValue(newMessage);

      const { sendMessage } = useMessageStore.getState();
      await sendMessage({ message: 'New', author: 'Jane' });

      const state = useMessageStore.getState();
      expect(state.messages).toHaveLength(2);
      expect(state.messages[0]).toEqual(existingMessage);
      expect(state.messages[1]).toEqual(newMessage);
    });
  });
});
