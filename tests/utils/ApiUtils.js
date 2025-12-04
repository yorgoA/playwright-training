class APIUtils {

    constructor(apiContext,loginPayload,orderPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.orderPayload = orderPayload;
    }
    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.loginPayload }
        )
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token)
        return token;
    }
    async createOrder() {
        const token = await this.getToken();
        this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",)
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
            data: this.orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson)
        const orderID = orderResponseJson.orders[0];
        return orderID;
    }
}
export { APIUtils };
