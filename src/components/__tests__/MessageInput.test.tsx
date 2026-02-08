import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessageInput } from '../MessageInput';

describe('MessageInput', () => {
  const mockOnChange = vi.fn();
  const mockOnSendMessage = vi.fn();
  const mockOnKeyDown = vi.fn();

  const defaultProps = {
    value: '',
    onChange: mockOnChange,
    onSendMessage: mockOnSendMessage,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls onChange when user types in the input', async () => {
    const user = userEvent.setup();
    render(<MessageInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('Type your message...');
    await user.type(input, 'Hello');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('disables send button when input is empty', () => {
    render(<MessageInput {...defaultProps} value="" />);

    const sendButton = screen.getByRole('button', { name: /send message/i });
    expect(sendButton).toBeDisabled();
  });

  it('disables send button when input contains only whitespace', () => {
    render(<MessageInput {...defaultProps} value="   " />);

    const sendButton = screen.getByRole('button', { name: /send message/i });
    expect(sendButton).toBeDisabled();
  });

  it('calls onSendMessage when send button is clicked', async () => {
    const user = userEvent.setup();
    render(<MessageInput {...defaultProps} value="Test message" />);

    const sendButton = screen.getByRole('button', { name: /send message/i });
    await user.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledTimes(1);
  });

  it('calls onKeyDown when provided and key is pressed', async () => {
    const user = userEvent.setup();
    render(<MessageInput {...defaultProps} onKeyDown={mockOnKeyDown} />);

    const input = screen.getByPlaceholderText('Type your message...');
    await user.type(input, '{Enter}');

    expect(mockOnKeyDown).toHaveBeenCalled();
  });
});
