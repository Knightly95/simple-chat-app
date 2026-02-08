import { api } from './api';
import type { Message, CreateMessageRequest } from '@/types/chat';
import { API_CONFIG } from '@/constants/api';

export interface GetMessagesParams {
  after?: string;
  before?: string;
  limit?: number;
}

export const messageService = {
  getMessages: async (params?: GetMessagesParams): Promise<Message[]> => {
    return api.get(API_CONFIG.ENDPOINTS.MESSAGES, {
      params: params as Record<string, string | number | undefined>,
    });
  },

  createMessage: async (data: CreateMessageRequest): Promise<Message> => {
    return api.post(API_CONFIG.ENDPOINTS.MESSAGES, data);
  },
};
