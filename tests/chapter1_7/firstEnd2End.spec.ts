import { expect, test } from '@playwright/test';

const USER_EMAIL = process.env.DEMO_USER_EMAIL ?? '';
const USER_PASSWORD = process.env.DEMO_USER_PASSWORD ?? '';

test('places an order and verifies it in order history', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/client/auth/login');

  await page.fill('#userEmail', USER_EMAIL);
  await page.fill('#userPassword', USER_PASSWORD);
  await page.click('#login');

  await page.waitForLoadState('networkidle');

  // Pick the first product card
  const productCard = page.locator('.card-body').first();

  // Get its name safely (trim, handle null)
  const productChosenNameRaw = await productCard.locator('b').textContent();
  const productChosenName = (productChosenNameRaw ?? '').trim();

  // Add to cart
  await productCard.getByRole('button', { name: 'Add To Cart' }).click();

  // Wait for the cart counter to update
  await page.locator('button[class="btn btn-custom"] label').waitFor();

  // Wait for toaster to appear and disappear
  const toastMessage = page.locator('div').filter({ hasText: 'Product Added To Cart' }).nth(2);
  await expect(toastMessage).toBeVisible();
  await expect(toastMessage).toBeHidden({ timeout: 5000 });

  // Go to cart page
  await page.locator('button[routerlink="/dashboard/cart"]').click();
  await page.waitForURL('**/cart');

  // Cart item titles are under .cartSection h3 on that site
  const cartItemTitles = page.locator('.cartSection h3');
  await expect(cartItemTitles).toContainText(productChosenName);

  // Place the order
  await page.getByRole('button', { name: 'Buy Now' }).click();
  await page.waitForLoadState();

  // Confirm the checkout email matches the logged-in user
  await expect(page.getByRole('textbox').nth(4)).toHaveValue(USER_EMAIL);

  // Choose country
  await page.getByRole('textbox', { name: 'Select Country' }).type('Leb');
  await page.getByRole('button', { name: ' Lebanon' }).click();

  // Place order
  await page.getByText('Place Order').click();

  // Verify the order confirmation
  const orderConfirmation = page.getByRole('heading', { name: 'Thankyou for the order.' });
  await expect(orderConfirmation).toHaveText('Thankyou for the order.');

  // Get order ID from the confirmation label
  const brutOrderID = await page.locator('label.ng-star-inserted').textContent();
  if (!brutOrderID) {
    throw new Error('Order ID not found!');
  }
  const orderId = brutOrderID.replaceAll('|', '').trim();

  // Go to order history page
  await page.getByText('Orders History Page').click();
  await page.locator('table.table-bordered').waitFor({ state: 'visible' });

  // Find the table and filter the row by ID
  const table = page.locator('table.table-bordered');
  const orderRow = table.getByRole('row').filter({
    has: page.getByText(orderId, { exact: true }),
  });

  // Verify the order appears exactly once in the history
  await expect(orderRow).toHaveCount(1);
});
