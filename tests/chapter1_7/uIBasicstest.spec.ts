import { test, expect } from '@playwright/test';

test('shows an error for wrong credentials, then logs in with the credentials shown on the page', async ({
  page,
}) => {
  const userName = page.locator('#username');
  const password = page.locator('#password');
  const signInBtn = page.locator('#signInBtn');
  const errorMessage = page.locator('.alert-danger');
  const cardTitles = page.locator('.card-body a');

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // The page prints valid demo credentials that regenerate on every load,
  // so we read them instead of hardcoding a value that would soon go stale.
  const validUsername = await page.locator('form p b i').nth(0).textContent();
  const validPassword = await page.locator('form p b i').nth(1).textContent();

  // First attempt: intentionally wrong password to verify the error path
  await userName.fill(validUsername ?? '');
  await password.fill('wrong-password');
  await signInBtn.click();
  await expect(errorMessage).toContainText('Incorrect');

  // Second attempt: the real credentials from the page
  await userName.fill('');
  await userName.fill(validUsername ?? '');
  await password.fill(validPassword ?? '');
  await signInBtn.click();

  await cardTitles.first().waitFor();
  const allTitles = await cardTitles.allTextContents();
  expect(allTitles.length).toBeGreaterThan(0);
});
