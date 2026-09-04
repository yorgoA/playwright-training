import { expect, test } from '@playwright/test';

test('extracts a value from a popup window and feeds it back into the parent page', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const userName = page.locator('#username');
  const link = page.locator('.blinkingText').first();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const [popup] = await Promise.all([context.waitForEvent('page'), link.click()]);
  await popup.waitForLoadState();

  const text = await popup.locator('.im-para.red').textContent();
  const domainName = text?.split('@')[1].split(' ')[0];

  await userName.fill(domainName ?? 'not found');

  await expect(userName).toHaveValue(domainName ?? 'not found');
});
