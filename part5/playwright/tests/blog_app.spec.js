// USE npm run start:test on backend, USE npm run dev on frontend

const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");
const { create } = require("node:domain");

describe("Blog App", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset"); // baseURL is localhost:5173
        await request.post("/api/users", {
            data: {
                name: "USER2 NAME",
                username: "user2",
                password: "password",
            },
        });
        await page.goto("/");
    });
    test("front page can be opened", async ({ page }) => {
        const locator = await page.getByText("Log in to application");
        await expect(locator).toBeVisible();
    });

    test("login form can be opened", async ({ page }) => {
        loginWith(page, "user2", "password");
        await expect(page.getByText("user2 logged in")).toBeVisible();
    });

    test("login fails with wrong password", async ({ page }) => {
        await loginWith(page, "dozetype", "wrong password");

        const errorDiv = page.locator(".error"); //locating user css class
        await expect(errorDiv).toContainText("Wrong Username or Password");
        await expect(errorDiv).toHaveCSS("border-style", "solid");
        await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
        await expect(page.getByText("dozetype logged in")).not.toBeVisible();
    });

    describe("when logged in", () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, "user2", "password");
        });

        test("a new note can be created", async ({ page }) => {
            await createBlog(
                page,
                "playwright title",
                "playwright author",
                "playwright url",
            );
            await expect(
                page.getByText(
                    "a new blog playwright title by playwright author added",
                ),
            ).toBeVisible();
        });

        describe("and a blog exists", () => {
            // New Describe will run all beforeEachs
            beforeEach(async ({ page }) => {
                await createBlog(page, 'Another playwright title', 'Another playwright author', 'Another playwright url')
            });

            test("importance can be changed", async ({ page }) => {
                await page.getByRole("button", { name: "view" }).click();
                await expect(page.getByText("likes")).toBeVisible();
            });
        });
        
        describe("and several blogs exists", ()=>{
            beforeEach(async ({page}) => {
                await createBlog(page, 'blog 1', 'author 1', 'url1.com');
                await createBlog(page, 'blog 2', 'author 2', 'url2.com');
            })
            test("one can be deleted", async () => {
                
                // await page.getByRole("button", { name: "view" }).click();
                // await page.getByRole("button", { name: "remove" }).click();
                // const blogs = await page.locator('.blogCSS').count();
                // expect(blogs).toBe(1);
            })
        })
    });
});
