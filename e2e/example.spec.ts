import { test, expect } from '@playwright/test';

test('should load the application', async ({ page }) => {
  await page.goto('/');
  const title = await page.title();
  expect(title).toBeDefined();
});
