import { create } from 'zustand';

import type { Message, CreateMessageRequest } from '@/types/chat';
import {
  messageService,
  type GetMessagesParams,
} from '@/services/messageService';
import { API_CONFIG } from '@/constants/api';

interface MessageStore {
  messages: Message[];
  loading: boolean;
  error: string | null;

  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  fetchMessages: (params?: GetMessagesParams) => Promise<void>;
  sendMessage: (data: CreateMessageRequest) => Promise<void>;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  loading: false,
  error: null,

  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),

  fetchMessages: async (params?: GetMessagesParams) => {
    set({ loading: true, error: null });
    try {
      const queryParams = {
        limit: API_CONFIG.DEFAULTS.MESSAGE_LIMIT,
        ...params,
      };
      const messages = await messageService.getMessages(queryParams);
      set({ messages, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch messages';
      set({ error: errorMessage, loading: false });
    }
  },

  sendMessage: async (data: CreateMessageRequest) => {
    set({ loading: true, error: null });
    try {
      const message = await messageService.createMessage(data);
      get().addMessage(message);
      set({ loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to send message';
      set({ error: errorMessage, loading: false });
    }
  },
}));
