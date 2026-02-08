import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WebSocketToggle } from '../WebSocketToggle';

describe('WebSocketToggle', () => {
  it('calls onToggle when button is clicked', async () => {
    const mockOnToggle = vi.fn();
    const user = userEvent.setup();

    render(<WebSocketToggle enabled={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('shows WiFi icon when enabled', () => {
    render(<WebSocketToggle enabled={true} onToggle={vi.fn()} />);

    const button = screen.getByRole('button');
    const wifiIcon = button.querySelector('[data-testid="WifiIcon"]');

    expect(wifiIcon).toBeTruthy();
  });

  it('shows WiFi-off icon when disabled', () => {
    render(<WebSocketToggle enabled={false} onToggle={vi.fn()} />);

    const button = screen.getByRole('button');
    const wifiOffIcon = button.querySelector('[data-testid="WifiOffIcon"]');

    expect(wifiOffIcon).toBeTruthy();
  });
});
