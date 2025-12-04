import {test,expect,request} from '@playwright/test';
import { APIUtils } from '../utils/ApiUtils';
const loginPayload = {userEmail:"yorgoaoun5@hotmail.com",userPassword:"Test1234$"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"68a961719320a140fe1ca57c"}]}
let token: any;
let orderID: any;
test.beforeAll(async () => {
    // Login API call
     const apiContext = await request.newContext();
     const apiUtils = new APIUtils(apiContext,loginPayload,orderPayload);
    token = await apiUtils.getToken();
    orderID = await apiUtils.createOrder()

});


test('Api login', async ({ page }) => {
page.addInitScript(value => {
    window.localStorage.setItem('token',value); 
},token
);
    await page.goto("https://rahulshettyacademy.com/client");

 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (orderID.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(orderID.includes(orderIdDetails)).toBeTruthy();
});