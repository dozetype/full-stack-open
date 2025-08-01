const loginWith = async (page, username, password) => {
    await page.getByTestId("username").fill(username);
    await page.getByTestId("password").fill(password);
    await page.getByRole("button", { name: "login" }).click();
};

const logOut = async (page) => {
    await page.getByRole("button", { name: "log out" }).click();
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole("button", { name: "new blog" }).click();
    await page.getByTestId("Title").fill(title);
    await page.getByTestId("Author").fill(author);
    await page.getByTestId("URL").fill(url);
    await page.getByRole("button", { name: "create" }).click();
};
export { loginWith, createBlog, logOut };
