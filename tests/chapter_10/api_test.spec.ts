import {test,expect,request} from '@playwright/test';
import { APIUtils } from '../utils/ApiUtils';
const loginPayload = {userEmail:"yorgoaoun5@hotmail.com",userPassword:"Test1234$"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
let token: any;
let orderID: any;
test.beforeAll(async () => {
    // Login API call
     const apiContext = await request.newContext();
     const apiUtils = new APIUtils(apiContext,loginPayload,orderPayload);
     apiUtils.createOrder()


});


test('Api login', async ({ page }) => {
page.addInitScript(value => {
    window.localStorage.setItem('token',value); 
},token
);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor();

});