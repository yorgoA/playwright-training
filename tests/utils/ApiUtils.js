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
        token = loginResponseJson.token;
        console.log(token)
        return token;
    }
    async createOrder() {
        this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",)
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
            {
            data: this.orderPayload,
            headers: {
                'Authorization': this.getToken(),
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson)
        orderID = orderResponseJson.orders[0];
        return orderID;
    }
}
export { APIUtils };
