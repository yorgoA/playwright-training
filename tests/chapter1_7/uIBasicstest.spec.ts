import { expect, test } from '@playwright/test';
test("First playwright test",async({page})=>
{
const userName = page.locator("#username")
const signInBtn = page.locator("#signInBtn")
const cardTitles = page.locator(".card-body a")
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
console.log(await page.title())
await userName.fill("rahulshetty")
await page.locator("#password").fill("learning")
await signInBtn.click()
console.log(await page.locator("[style*='block']").textContent())
await expect(page.locator("[style*='block']")).toContainText("Incorrect")
await userName.fill("")
await userName.fill("rahulshettyacademy")
await signInBtn.click()
console.log(await cardTitles.nth(0).textContent())
const allTitles = await cardTitles.allTextContents()
console.log(allTitles)
    // playwright code r
});

