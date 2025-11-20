import { expect, test } from '@playwright/test';

test('New Page Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/client/auth/login');

  await page.fill('#userEmail', 'yorgoaoun5@gmail.com');
  await page.fill('#userPassword', 'Test1234$');
  await page.click('#login');

  await page.waitForLoadState('networkidle');

  // Pick the first product card
  const productCard = page.locator('.card-body').first();

  // Get its name safely (trim, handle null)
  const productChosenNameRaw = await productCard.locator('b').textContent();
  const productChosenName = (productChosenNameRaw ?? '').trim();

  // Add to cart
  await productCard.getByRole('button', { name: 'Add To Cart' }).click();

  // Wait for he cart to be incremented 
  await page.locator('button[class="btn btn-custom"] label').waitFor()

  // Wait for toaster to appear and disappear
    const toastMessage = page.locator('div').filter({ hasText: 'Product Added To Cart' }).nth(2)
    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toBeHidden({ timeout: 5000 });
  // Go to cart page
  await page.getByRole('button', { name: '   Cart' }).click()

  //Wait for page to load
  await page.waitForURL('**/cart'); 

  // Cart item titles are under .cartSection h3 on that site
  const cartItemTitles = page.locator('.cartSection h3');

  // Option A: assert one of the titles contains the chosen name
  console.log(await cartItemTitles.textContent());
  console.log(productChosenName);
  await expect(cartItemTitles).toContainText(productChosenName);

// Click on purchase button 
await page.getByRole('button', { name: 'Buy Now' }).click();
await page.waitForLoadState();

//check email correct 
await expect(page.getByRole('textbox').nth(4)).toHaveValue('yorgoaoun5@gmail.com');

//Choose country 
await page.getByRole('textbox', { name: 'Select Country' }).type('Leb');
await page.getByRole('button', { name: ' Lebanon' }).click();

//Place order
await page.getByText('Place Order').click();

// Check Order passed
const orderConfirmation = page.getByRole('heading', { name: 'Thankyou for the order.' })
await expect(orderConfirmation).toHaveText('Thankyou for the order.');
await page.locator('div').filter({ hasText: 'Order Placed Successfully' }).nth(2)

//Get orderID
const brutOrderID = await page.locator('label.ng-star-inserted').textContent();

if (!brutOrderID) {
  throw new Error('Order ID not found!');
}

const orderId = brutOrderID.replaceAll('|', '').trim();
console.log(orderId)
//Go to order page
await page.getByText('Orders History Page').click()

//Wait for page to load
await page.locator('table.table-bordered').waitFor({ state: 'visible' });

// Find the table and filter the row by ID
const table = await page.locator('table.table-bordered');
const orderRow = await table.getByRole('row').filter({
  has: page.getByText(orderId, { exact: true })
});

// Verify it exists only one 
await expect(orderRow).toHaveCount(1);



});
