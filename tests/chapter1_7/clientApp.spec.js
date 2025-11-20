import { expect, test } from '@playwright/test';

test("Second playwright test",async({page})=>
{
// const context = await browser.newContext();
// const page = await context.newPage()
await page.goto("https://rahulshettyacademy.com/client/auth/login")
const email = page.locator("#userEmail")
const password = page.locator("#userPassword")
const login = page.locator("#login")
const signUp = page.locator('a', { hasText: 'Register here' })
await email.fill("yorgoaoun5@gmail.com")
await password.fill("Test1234$")
await login.click()
await page.waitForLoadState('networkidle')
// await signUp.click()
// await page.locator("#firstName").fill("Zoro")
// await page.locator("#lastName").fill("Aoun")
// await page.locator("#userEmail").fill("yorgoaoun5@gmail.com")
// await page.locator("#userMobile").fill("1234567891")
// await page.locator("#userPassword").fill("Test1234$")
// await page.locator("#confirmPassword").fill("Test1234$")
// await page.locator('select[formcontrolname="occupation"]').selectOption('3: Engineer');
// await page.locator('input[formcontrolname="gender"][value="Male"]').click()
// await page.locator('input[formcontrolname="required"]').click()
// await page.locator("#login").click()
// await page.locator('button[routerlink="/auth"]').click();
// await email.fill("yorgoaoun5@gmail.com")
// await password.fill("Test1234$")
// await login.click()
const products = page.locator(".card-body b")

// Other methods to wait for the page to load correctly 
// 1) 
console.log(await products.first().waitFor())
//2) console.log(await products.nth(1).textContent())
//3) await products.waitForLoadState()
console.log( await products.allTextContents('networkidle'))

});