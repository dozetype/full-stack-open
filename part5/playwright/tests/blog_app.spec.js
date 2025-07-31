const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog App", () => {
    beforeEach(async ({page}) => {
        await page.goto("http://localhost:5173")
    })
    test("front page can be opened", async ({ page }) => {

        const locator = await page.getByText("Log in to application");
        await expect(locator).toBeVisible();
    });

    test("login form can be opened", async ({ page }) => {
        await page.getByTestId('username').fill("user2");
        await page.getByTestId('password').fill("password");
        await page.getByRole("button", { name: "login" }).click();
        await expect(page.getByText("user2 logged in")).toBeVisible();
    });
    
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
          await page.getByTestId('username').fill('user2')
          await page.getByTestId('password').fill('password')
          await page.getByRole('button', { name: 'login' }).click()
        })
    
        test('a new note can be created', async ({ page }) => {
          await page.getByRole('button', { name: 'new blog' }).click()
          await page.getByTestId('Title').fill('playwright test')
          await page.getByTestId('Author').fill('playwright test2')
          await page.getByTestId('URL').fill('playwright test3')
          await page.getByRole('button', { name: 'create' }).click()
          await expect(page.getByText('a new blog playwright test by playwright test2 added')).toBeVisible()
        })
      })  
});
