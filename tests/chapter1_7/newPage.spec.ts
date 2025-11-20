import { expect, test } from '@playwright/test';
test("Child window hanlding",async({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator("#username")
const signInBtn = page.locator("#signInBtn")
const Link = page.locator(".blinkingText")
await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
const [newPage] = await Promise.all(
    [
context.waitForEvent("page"),
await Link.click(),
    ]
)
const text = await newPage.locator(".im-para.red").textContent()
const domainName = text?.split("@")[1].split(" ")[0]
console.log(text)
console.log(domainName)
await userName.fill(domainName ?? "not found")
}); 