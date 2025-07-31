import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import blogService from "../services/blogs";

vi.mock("../services/blogs", () => {
    return {
        default: {
            create: vi.fn(),
            // you can mock other methods like update, remove here if needed
        },
    };
});

test("calls blogService.create with correct data on submit", async () => {
    const setBlogs = vi.fn();
    const setSuccessMessage = vi.fn();
    const setErrorMessage = vi.fn();
    const blogs = [];

    // Mock the resolved value for create
    blogService.create.mockResolvedValue({
        title: "Test Title",
        author: "Test Author",
        url: "http://testurl.com",
    });

    render(
        <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
        />,
    );

    const user = userEvent.setup();

    // Fill form fields
    await user.type(
        screen.getByRole("textbox", { name: /title/i }),
        "Test Title",
    );
    await user.type(
        screen.getByRole("textbox", { name: /author/i }),
        "Test Author",
    );
    await user.type(
        screen.getByRole("textbox", { name: /url/i }),
        "http://testurl.com",
    );

    // Submit form
    await user.click(screen.getByRole("button", { name: /create/i }));

    // Expect blogService.create called once with correct object
    expect(blogService.create).toHaveBeenCalledWith({
        title: "Test Title",
        author: "Test Author",
        url: "http://testurl.com",
    });

    // Expect setBlogs to be called to add the new blog
    expect(setBlogs).toHaveBeenCalledWith(
        expect.arrayContaining([
            expect.objectContaining({
                title: "Test Title",
                author: "Test Author",
                url: "http://testurl.com",
            }),
        ]),
    );

    // Expect success message to be set
    expect(setSuccessMessage).toHaveBeenCalledWith(
        "a new blog Test Title by Test Author added",
    );
});
