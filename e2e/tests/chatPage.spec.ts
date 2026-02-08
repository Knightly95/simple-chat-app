import { test, expect } from '../fixtures/mockAPI';
import { ChatPagePOM } from '../pages/ChatPage.page';

test.describe('ChatPage E2E Tests', () => {
  let chatPage: ChatPagePOM;

  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPagePOM(page);
    await chatPage.goto();
    await chatPage.waitForMessagesLoaded();
  });

  test('should load chat page with messages', async () => {
    const messageCount = await chatPage.getMessageCount();
    expect(messageCount).toBeGreaterThan(0);
  });

  test('should disable send button when input is empty', async () => {
    await chatPage.clearInput();
    const isDisabled = await chatPage.isSendButtonDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test('should disable send button on whitespace-only input', async () => {
    await chatPage.typeMessage('   ');
    const isDisabled = await chatPage.isSendButtonDisabled();
    expect(isDisabled).toBeTruthy();
  });

  test('should send message when send button is clicked', async () => {
    const initialCount = await chatPage.getMessageCount();
    const testMessage = `Test message ${Date.now()}`;

    await chatPage.typeAndSendMessage(testMessage);
    await chatPage.page.waitForTimeout(500);

    const finalCount = await chatPage.getMessageCount();
    expect(finalCount).toBeGreaterThan(initialCount);
  });

  test('should clear input after sending message', async () => {
    await chatPage.typeAndSendMessage('Test message');
    await chatPage.page.waitForTimeout(100);

    const inputValue = await chatPage.getInputValue();
    expect(inputValue).toBe('');
  });

  test('should send message on Enter key press', async () => {
    const initialCount = await chatPage.getMessageCount();
    const testMessage = `Enter key test ${Date.now()}`;

    await chatPage.typeMessage(testMessage);
    await chatPage.pressEnter();
    await chatPage.page.waitForTimeout(500);

    const finalCount = await chatPage.getMessageCount();
    expect(finalCount).toBeGreaterThan(initialCount);
  });

  test('should not send message on Shift+Enter (multiline)', async () => {
    const initialCount = await chatPage.getMessageCount();

    await chatPage.typeMessage('Line 1');
    await chatPage.pressShiftEnter();
    const inputValue = await chatPage.getInputValue();

    expect(inputValue).toContain('Line 1');
    const countAfterShiftEnter = await chatPage.getMessageCount();
    expect(countAfterShiftEnter).toBe(initialCount);
  });

  test('should handle multiline message input', async () => {
    const testLines = ['First line', 'Second line', 'Third line'];
    await chatPage.typeMultilineMessage(testLines);

    const inputValue = await chatPage.getInputValue();
    expect(inputValue).toContain('First line');
    expect(inputValue).toContain('Second line');
    expect(inputValue).toContain('Third line');
  });

  test('should maintain responsive layout on different viewport sizes', async () => {
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await chatPage.page.setViewportSize(viewport);
      await chatPage.goto();
      await chatPage.page.waitForTimeout(1000);

      const messageInput = await chatPage.messageInput.isVisible();
      const sendButton = await chatPage.sendButton.isVisible();

      expect(messageInput).toBeTruthy();
      expect(sendButton).toBeTruthy();
    }
  });
});
