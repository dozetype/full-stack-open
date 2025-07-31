const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog App", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("http://localhost:3001/api/testing/reset");
        await request.post("http://localhost:3001/api/users", {
            data: {
                name: "USER2 NAME",
                username: "user2",
                password: "password",
            },
        });
        await page.goto("http://localhost:5173");
    });
    test("front page can be opened", async ({ page }) => {
        const locator = await page.getByText("Log in to application");
        await expect(locator).toBeVisible();
    });

    test("login form can be opened", async ({ page }) => {
        await page.getByTestId("username").fill("user2");
        await page.getByTestId("password").fill("password");
        await page.getByRole("button", { name: "login" }).click();
        await expect(page.getByText("user2 logged in")).toBeVisible();
    });

    test("login fails with wrong password", async ({ page }) => {
        await page.getByTestId("username").fill("dozetype");
        await page.getByTestId("password").fill("wrong password");
        await page.getByRole("button", { name: "login" }).click();

        const errorDiv = page.locator(".error"); //locating user css class
        await expect(errorDiv).toContainText("Wrong Username or Password");
        await expect(errorDiv).toHaveCSS("border-style", "solid");
        await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
          await expect(page.getByText('dozetype logged in')).not.toBeVisible()
    });

    describe("when logged in", () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId("username").fill("user2");
            await page.getByTestId("password").fill("password");
            await page.getByRole("button", { name: "login" }).click();
        });

        test("a new note can be created", async ({ page }) => {
            await page.getByRole("button", { name: "new blog" }).click();
            await page.getByTestId("Title").fill("playwright test");
            await page.getByTestId("Author").fill("playwright test2");
            await page.getByTestId("URL").fill("playwright test3");
            await page.getByRole("button", { name: "create" }).click();
            await expect(
                page.getByText(
                    "a new blog playwright test by playwright test2 added",
                ),
            ).toBeVisible();
        });

        describe("and a blog exists", () => {
            // New Describe will run all beforeEachs
            beforeEach(async ({ page }) => {
                await page.getByRole("button", { name: "new blog" }).click();
                await page.getByTestId("Title").fill("Another playwright test");
                await page
                    .getByTestId("Author")
                    .fill("ANother playwright test2");
                await page.getByTestId("URL").fill("Another playwright test3");
                await page.getByRole("button", { name: "create" }).click();
            });

            test("importance can be changed", async ({ page }) => {
                await page.getByRole("button", { name: "view" }).click();
                await expect(page.getByText("likes")).toBeVisible();
            });
        });
    });
});
