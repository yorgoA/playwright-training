import { test, expect } from '@playwright/test';

test('How to handle calendars', async ({ page }) => {
    const monthNumber = "6"
    const dayNumber = "15"
    const yearNumber = "2027"
    const expectedList = [monthNumber, dayNumber, yearNumber];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    //open calendar
    await page.locator('.react-date-picker__inputGroup').click();
    //choose YEAR
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.getByText(yearNumber).click();
    //choose month 
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();;
    //choose DAY
    await page.locator(".react-calendar__tile").nth(Number(dayNumber)).click();
    await page.screenshot({ path: 'calendar.png' });
    const inputs = page.locator('.react-date-picker__inputGroup__input')

    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

});
