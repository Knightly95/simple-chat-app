import { http, HttpResponse } from 'msw';
import type { CreateMessageRequest } from '@/types/chat';
import { mockMessages, createMockMessage } from './data/messages';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const handlers = [
  // GET /api/v1/messages - Fetch all messages
  http.get(`${API_BASE_URL}/messages`, () => {
    return HttpResponse.json(mockMessages, { status: 200 });
  }),

  // POST /api/v1/messages - Create new message
  http.post(`${API_BASE_URL}/messages`, async ({ request }) => {
    const data = (await request.json()) as CreateMessageRequest;
    const newMessage = createMockMessage(data);
    mockMessages.push(newMessage);
    return HttpResponse.json(newMessage, { status: 201 });
  }),
];
