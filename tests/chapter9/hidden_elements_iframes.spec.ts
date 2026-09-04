import { test, expect } from '@playwright/test';

test('Handling hidden elements and iframes', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.goto('https://google.com');
  await page.goBack();

  await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

  page.on('dialog', (dialog) => dialog.accept());
  await page.locator('#confirmbtn').click();
  await page.locator('#mousehover').hover();

  const coursesFrame = page.frameLocator('#courses-iframe');
  await expect(coursesFrame.getByText('Featured Courses')).toBeVisible();
});
