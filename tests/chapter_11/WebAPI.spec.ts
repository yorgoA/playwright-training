import { expect, request, test } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/api/ecom';

test.describe('Ecom API - pure request/response testing (no browser)', () => {
  test('rejects login with an invalid password', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.post(`${BASE_URL}/auth/login`, {
      data: { userEmail: 'nobody@example.com', userPassword: 'wrong-password' },
    });
    const body = await response.json();

    expect(response.ok()).toBeFalsy();
    expect(body.message).toContain('Incorrect');
  });

  test('logs in and returns the product catalog', async () => {
    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post(`${BASE_URL}/auth/login`, {
      data: {
        userEmail: process.env.DEMO_USER_EMAIL ?? '',
        userPassword: process.env.DEMO_USER_PASSWORD ?? '',
      },
    });
    expect(loginResponse.ok()).toBeTruthy();
    const { token } = await loginResponse.json();

    const productsResponse = await apiContext.post(`${BASE_URL}/product/get-all-products`, {
      headers: { Authorization: token },
    });
    expect(productsResponse.ok()).toBeTruthy();

    const { data: products } = await productsResponse.json();
    expect(Array.isArray(products)).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('productName');
      expect(typeof product.productPrice).toBe('number');
    }
  });
});
