import { APIRequestContext } from '@playwright/test';

interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

const BASE_URL = 'https://rahulshettyacademy.com/api/ecom';

export class APIUtils {
  constructor(
    private apiContext: APIRequestContext,
    private loginPayload: LoginPayload,
  ) {}

  async getToken(): Promise<string> {
    const response = await this.apiContext.post(`${BASE_URL}/auth/login`, {
      data: this.loginPayload,
    });
    const body = await response.json();

    if (!body.token) {
      throw new Error(`Login failed: ${body.message ?? 'unknown error'}`);
    }
    return body.token;
  }

  async getFirstProductId(token: string): Promise<string> {
    const response = await this.apiContext.post(`${BASE_URL}/product/get-all-products`, {
      headers: { Authorization: token },
    });
    const body = await response.json();
    return body.data[0]._id;
  }

  async createOrder(token: string, country: string): Promise<string> {
    const productId = await this.getFirstProductId(token);

    const response = await this.apiContext.post(`${BASE_URL}/order/create-order`, {
      data: { orders: [{ country, productOrderedId: productId }] },
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    return body.orders[0];
  }
}
