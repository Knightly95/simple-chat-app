import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { mockMessages, createMockMessage } from '@/mocks/data/messages';

export { expect };

type TestFixtures = {
  page: Page;
  mockAPI: void;
};

export const test = base.extend<TestFixtures>({
  mockAPI: [
    async ({ page }, use) => {
      // Intercept API requests and use centralized mock data from MSW structure
      await page.route('**/api/v1/messages**', async (route) => {
        if (route.request().method() === 'GET') {
          // Use mock data from MSW data layer
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockMessages),
          });
        } else if (route.request().method() === 'POST') {
          // Use factory function from MSW data layer
          const postData = route.request().postDataJSON();
          const newMessage = createMockMessage(postData);

          await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify(newMessage),
          });
        }
      });

      await use();
    },
    { auto: true },
  ],
});
