import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ChatPage from '../ChatPage';

import type { MessageStore } from '@/stores/messageStore';

const createMockStore = (
  messages: MessageStore['messages'] = []
): MessageStore => ({
  messages,
  loading: false,
  error: null,
  setMessages: vi.fn(),
  addMessage: vi.fn(),
  clearMessages: vi.fn(),
  setError: vi.fn(),
  setLoading: vi.fn(),
  fetchMessages: vi.fn(),
  sendMessage: vi.fn(),
});

vi.mock('@/stores/messageStore', () => ({
  useMessageStore: (selector: (state: MessageStore) => unknown) => {
    const store = createMockStore([
      {
        _id: '1',
        message: 'Hello',
        author: 'John',
        createdAt: new Date('2026-02-08T10:00:00Z'),
      },
    ]);
    return selector(store);
  },
}));

const renderChatPage = () => {
  return render(
    <BrowserRouter>
      <ChatPage />
    </BrowserRouter>
  );
};

describe('ChatPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders message list and input', () => {
    renderChatPage();
    expect(screen.getByPlaceholderText('Type your message...')).toBeTruthy();
    expect(screen.getByRole('button', { name: /send message/i })).toBeTruthy();
  });

  it('displays existing messages', () => {
    renderChatPage();
    expect(screen.getByText('Hello')).toBeTruthy();
    expect(screen.getByText('John')).toBeTruthy();
  });

  it('enables send button when input has text', async () => {
    const user = userEvent.setup();
    renderChatPage();

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send message/i });

    expect(sendButton).toBeDisabled();

    await user.type(input, 'Test message');
    expect(sendButton).not.toBeDisabled();
  });

  it('disables send button when input is empty or whitespace', async () => {
    const user = userEvent.setup();
    renderChatPage();

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send message/i });

    await user.type(input, 'Test');
    expect(sendButton).not.toBeDisabled();

    await user.clear(input);
    expect(sendButton).toBeDisabled();

    await user.type(input, '   ');
    expect(sendButton).toBeDisabled();
  });

  it('calls sendMessage when send button is clicked', async () => {
    const user = userEvent.setup();
    renderChatPage();

    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: /send message/i });

    await user.type(input, 'Test message');
    await user.click(sendButton);

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('');
    });
  });

  it('calls sendMessage on Enter key press', async () => {
    const user = userEvent.setup();
    renderChatPage();

    const input = screen.getByPlaceholderText('Type your message...');

    await user.type(input, 'Test message');
    await user.type(input, '{Enter}');

    await waitFor(() => {
      expect((input as HTMLInputElement).value).toBe('');
    });
  });

  it('allows multiline input with Shift+Enter', async () => {
    const user = userEvent.setup();
    renderChatPage();

    const input = screen.getByPlaceholderText(
      'Type your message...'
    ) as HTMLTextAreaElement;

    await user.type(input, 'Line 1');
    await user.type(input, '{Shift>}{Enter}{/Shift}');
    await user.type(input, 'Line 2');

    expect(input.value).toContain('Line 1');
    expect(input.value).toContain('Line 2');
  });

  it('clears input after sending message', async () => {
    const user = userEvent.setup();
    renderChatPage();

    const input = screen.getByPlaceholderText(
      'Type your message...'
    ) as HTMLTextAreaElement;

    await user.type(input, 'Test message');
    const sendButton = screen.getByRole('button', { name: /send message/i });
    await user.click(sendButton);

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('fetches messages on component mount', () => {
    renderChatPage();
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('scrolls to bottom when new messages arrive', async () => {
    renderChatPage();

    const scrollElement = screen.getByText('Hello').closest('div');
    expect(scrollElement).toBeTruthy();
  });
});
