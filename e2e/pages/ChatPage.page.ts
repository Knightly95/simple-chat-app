import { Page, Locator } from '@playwright/test';

export class ChatPagePOM {
  readonly page: Page;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly messageList: Locator;
  readonly messageBubbles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.messageInput = page.getByPlaceholder('Type your message...');
    this.sendButton = page.getByRole('button', { name: /send message/i });
    this.messageList = page.locator('main').first();
    this.messageBubbles = page.locator('[class*="MuiPaper-root"]');
  }

  async goto() {
    await this.page.goto('http://localhost:5173');
    await this.page.waitForLoadState('networkidle');
  }

  async typeMessage(message: string) {
    await this.messageInput.fill(message);
  }

  async sendMessage() {
    await this.sendButton.click();
  }

  async typeAndSendMessage(message: string) {
    await this.typeMessage(message);
    await this.sendMessage();
  }

  async clearInput() {
    await this.messageInput.clear();
  }

  async getInputValue(): Promise<string> {
    return await this.messageInput.inputValue();
  }

  async isSendButtonDisabled(): Promise<boolean> {
    return await this.sendButton.isDisabled();
  }

  async getMessageCount(): Promise<number> {
    return await this.messageBubbles.count();
  }

  async pressEnter() {
    await this.messageInput.press('Enter');
  }

  async pressShiftEnter() {
    await this.messageInput.press('Shift+Enter');
  }

  async typeMultilineMessage(lines: string[]) {
    await this.messageInput.fill(lines[0]);
    for (let i = 1; i < lines.length; i++) {
      await this.pressShiftEnter();
      await this.messageInput.type(lines[i]);
    }
  }

  async waitForMessagesLoaded() {
    await this.messageBubbles
      .first()
      .waitFor({ state: 'visible', timeout: 15000 });
  }
}
