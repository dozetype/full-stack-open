// USE npm run start:test on backend, USE npm run dev on frontend

const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog, logOut } = require("./helper");

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
    test("Login form is shown", async ({ page }) => {
        const locator = await page.getByText("Log in to application");
        await expect(locator).toBeVisible();
    });

    test("Login", async ({ page }) => {
        loginWith(page, "user2", "password");
        await expect(page.getByText("user2 logged in")).toBeVisible();
    });

    test("login fails with wrong credentials", async ({ page }) => {
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

        test("a new blog can be created", async ({ page }) => {
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
                await createBlog(
                    page,
                    "Another playwright title",
                    "Another playwright author",
                    "Another playwright url",
                );
            });

            test("can be liked", async ({ page }) => {
                await page.getByRole("button", { name: "view" }).click();
                await expect(page.getByText("likes")).toBeVisible();
                await page.getByRole("button", { name: "like" }).click();
                await expect(page.getByText("likes 1")).toBeVisible();
            });
        });

        describe("and several blogs exists", () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, "blog 1", "author 1", "url1.com");
                await createBlog(page, "blog 2", "author 2", "url2.com");
            });
            test("one can be deleted", async ({ page }) => {
                page.on("dialog", async (dialog) => {
                    // Handle window.confirm
                    if (dialog.type() === "confirm") {
                        await dialog.accept();
                    } else {
                        await dialog.dismiss();
                    }
                });
                await page.getByRole("button", { name: "view" }).click();
                await page.getByRole("button", { name: "remove" }).click();
                await expect(page.locator(".blogCSS")).toHaveCount(1);
            });
        });
    });

    describe("5.22 Only creator can delete", () => {
        beforeEach(async ({ page, request }) => {
            await request.post("/api/users", {
                data: {
                    name: "NEW NAME",
                    username: "NEWUSER",
                    password: "password",
                },
            });
            await loginWith(page, "user2", "password");
            await createBlog(page, "by user2", "user2", "example.com");
            await logOut(page);
            await loginWith(page, "NEWUSER", "password");
        });

        test("one can be deleted", async ({ page }) => {
            page.on("dialog", async (dialog) => {
                // Handle window.confirm
                if (dialog.type() === "confirm") {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }
            });
            await page.getByRole("button", { name: "view" }).click();
            await page.getByRole("button", { name: "remove" }).click();
            await expect(page.getByText("Didn't delete")).toBeVisible();
        });
    });

    describe("5.23", () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, "user2", "password");
        });
        test("blogs are sorted by number of likes descending", async ({
            page,
        }) => {
            await createBlog(page, "Least liked", "Author 1", "url1.com"); // 1 like
            await createBlog(page, "Most liked", "Author 2", "url2.com"); // 3 likes
            await createBlog(page, "Medium liked", "Author 3", "url3.com"); // 2 likes

            const likeBlog = async (title, times) => {
                const blog = page
                    .locator(".blogCSS")
                    .filter({ hasText: title });
                await blog.getByRole("button", { name: "view" }).click();
                for (let i = 0; i < times; i++) {
                    await blog.getByRole("button", { name: "like" }).click();
                    await page.waitForTimeout(200); // allow DOM/state update
                }
            };

            await likeBlog("Most liked", 3);
            await likeBlog("Medium liked", 2);
            await likeBlog("Least liked", 1);

            await page.reload();

            const blogTitles = page.locator(".blogCSS");

            await expect(blogTitles).toHaveCount(3);

            await expect(blogTitles.nth(0)).toContainText("Most liked");
            await expect(blogTitles.nth(1)).toContainText("Medium liked");
            await expect(blogTitles.nth(2)).toContainText("Least liked");
        });
    });
});
