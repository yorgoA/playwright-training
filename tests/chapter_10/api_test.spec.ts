import { expect, request, test } from '@playwright/test';
import { APIUtils } from '../utils/ApiUtils';

const loginPayload = {
  userEmail: process.env.DEMO_USER_EMAIL ?? '',
  userPassword: process.env.DEMO_USER_PASSWORD ?? '',
};

let token: string;
let orderID: string;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);

  token = await apiUtils.getToken();
  orderID = await apiUtils.createOrder(token, 'Cuba');
});

test('order placed through the API shows up in the UI order history', async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('tbody').waitFor();

  const rows = page.locator('tbody tr');
  let matched = false;

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (rowOrderId && orderID.includes(rowOrderId)) {
      await rows.nth(i).locator('button').first().click();
      matched = true;
      break;
    }
  }

  expect(matched).toBeTruthy();

  const orderIdDetails = await page.locator('.col-text').textContent();
  expect(orderIdDetails && orderID.includes(orderIdDetails)).toBeTruthy();
});
