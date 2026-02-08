import type { Message, CreateMessageRequest } from '@/types/chat';

export const mockMessages: Message[] = [
  {
    _id: '1',
    message: 'Cool! It&#39;s super easy to vote.',
    author: 'John',
    createdAt: new Date('2026-02-08T06:14:44Z').toISOString(),
  },
  {
    _id: '2',
    message:
      'Could everyone vote by tomorrow? Then we can lock in the restaurant reservation.',
    author: 'Luka',
    createdAt: new Date('2026-02-08T07:16:44Z').toISOString(),
  },
  {
    _id: '3',
    message: "Done! Love how it shows everyone's availability at a glance.",
    author: 'Maddie',
    createdAt: new Date('2026-02-08T08:19:14Z').toISOString(),
  },
  {
    _id: '4',
    message: "Just submitted my preferences. Can't wait for the lunch! 😊",
    author: 'Nina',
    createdAt: new Date('2026-02-08T09:21:44Z').toISOString(),
  },
];

export const createMockMessage = (data: CreateMessageRequest): Message => ({
  _id: `${Date.now()}`,
  message: data.message,
  author: data.author,
  createdAt: new Date().toISOString(),
});
