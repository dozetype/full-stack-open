const { test, expect, describe } = require("@playwright/test");

describe("Blog App", () => {
    test("front page can be opened", async ({ page }) => {
        await page.goto("http://localhost:5173");

        const locator = await page.getByText("Log in to application");
        await expect(locator).toBeVisible();
        // await expect(
        //     page.getByText(
        //         "Note app, Department of Computer Science, University of Helsinki 2023",
        //     ),
        // ).toBeVisible();
    });

    test("login form can be opened", async ({ page }) => {
        await page.goto("http://localhost:5173");

        await page.getByRole('textbox').first().fill('user2')
        await page.getByRole('textbox').last().fill('password')
        await page.getByRole("button", { name: "login" }).click();
            await expect(page.getByText('user2 logged in')).toBeVisible()
    });
});
