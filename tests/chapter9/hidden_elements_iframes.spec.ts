import {test,expect} from '@playwright/test';

test('Handling hidden elements and iframes', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.goto('https://google.com')
    await page.goBack();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();
    await page.locator('#confirmbtn').click();
    await page.on('dialog', dialog => dialog.accept());
    await page.locator('#mousehover').hover();
    const frame_page = page.frameLocator('#courses-iframe')
    /// await frame_page.locator('iframe[name="iframe-name"]').contentFrame().getByRole('button', { name: 'Close' }).click();
    await frame_page.locator( 'a.text-muted-foreground.hover\\:text-primary.transition-colors.flex.items-center.gap-1.relative.pr-8.whitespace-nowrap').click();
    const title = await frame_page.locator('span:has-text("From Zero to Hero")').textContent();
    console.log(title);


    
    
});