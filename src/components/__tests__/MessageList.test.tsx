import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageList } from '../MessageList';
import type { Message } from '@/types/chat';

describe('MessageList', () => {
  const mockScrollRef = { current: null };

  it('displays empty state when there are no messages', () => {
    render(<MessageList messages={[]} scrollRef={mockScrollRef} />);

    expect(
      screen.getByText('No messages yet. Start a conversation!')
    ).toBeTruthy();
  });

  it('displays messages when messages array has items', () => {
    const messages: Message[] = [
      {
        _id: '1',
        message: 'Hello World',
        author: 'John',
        createdAt: new Date('2026-02-08T10:00:00Z'),
      },
      {
        _id: '2',
        message: 'Test message',
        author: 'Jane',
        createdAt: new Date('2026-02-08T10:01:00Z'),
      },
    ];

    render(<MessageList messages={messages} scrollRef={mockScrollRef} />);

    expect(screen.getByText('Hello World')).toBeTruthy();
    expect(screen.getByText('Test message')).toBeTruthy();
    expect(screen.getByText('John')).toBeTruthy();
    expect(screen.getByText('Jane')).toBeTruthy();
  });
});
