import { expect, test } from '@playwright/test';

test('registers a new account and lands on the login page', async ({ page }) => {
  // Use a unique email on every run so registration never collides with a previous run
  const uniqueEmail = `pw.training.${Date.now()}@example.com`;

  await page.goto('https://rahulshettyacademy.com/client/auth/register');

  await page.locator('#firstName').fill('Zoro');
  await page.locator('#lastName').fill('Aoun');
  await page.locator('#userEmail').fill(uniqueEmail);
  await page.locator('#userMobile').fill('1234567891');
  await page.locator('#userPassword').fill('Test1234$');
  await page.locator('#confirmPassword').fill('Test1234$');
  await page.locator('select[formcontrolname="occupation"]').selectOption('3: Engineer');
  await page.locator('input[formcontrolname="gender"][value="Male"]').click();
  await page.locator('input[formcontrolname="required"]').click();
  await page.locator('#login').click();

  // Registration succeeds inline and shows a confirmation dialog with its own "Login" button
  await expect(page.getByRole('heading', { name: 'Account Created Successfully' })).toBeVisible();
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/auth/login');
  await expect(page).toHaveURL(/\/auth\/login/);
});

test('logs in and lists the available products', async ({ page }) => {
  const email = process.env.DEMO_USER_EMAIL ?? '';
  const password = process.env.DEMO_USER_PASSWORD ?? '';

  await page.goto('https://rahulshettyacademy.com/client/auth/login');

  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill(password);
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');

  const productNames = page.locator('.card-body b');
  await productNames.first().waitFor();

  const allTitles = await productNames.allTextContents();
  expect(allTitles.length).toBeGreaterThan(0);
});
