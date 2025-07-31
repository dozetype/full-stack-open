import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import blogService from "../services/blogs";

// import { describe } from "vitest";

vi.mock("../services/blogs", () => ({
    default: {
        update: vi.fn(),
    },
}));

describe("5.13 - 5.15", () => {
    test("Able to render normal obj", async () => {
        const blog = {
            title: "Front End Test",
            author: "XW",
            url: "example.com",
            likes: 5,
        };
        // const mockHandler = vi.fn();

        const blogs = [blog];
        // const setBlogs = jest.fn()
        const { container } = render(<Blog blog={blog} blogs={blogs} />);
        // const user = userEvent.setup();
        // const button = screen.getByText("make not important");
        // await user.click(button);
        // expect(mockHandler.mock.calls).toHaveLength(1);

        const div = container.querySelector(".blogCSS");
        screen.debug(div);
        expect(div).toHaveTextContent(/Front End Test/);
    });

    test("like button updates like count and calls service", async () => {
        const blog = {
            id: "123",
            title: "Test Blog",
            author: "XW",
            url: "http://example.com",
            likes: 0,
            user: { username: "xw" },
        };

        const setBlogs = vi.fn();
        const setSuccessMessage = vi.fn();
        const setErrorMessage = vi.fn();

        render(
            <Blog
                blog={blog}
                blogs={[blog]}
                setBlogs={setBlogs}
                setSuccessMessage={setSuccessMessage}
                setErrorMessage={setErrorMessage}
            />,
        );

        const user = userEvent.setup();

        // Reveal the hidden blog details
        const viewBtn = screen.getByText("view");
        await user.click(viewBtn);

        // Click the like button
        const likeBtn = screen.getByText("like");
        await user.click(likeBtn);

        // Check if the likes incremented visually
        expect(screen.getByText("likes 1")).toBeInTheDocument();

        // Check if update was called with incremented likes
        expect(blogService.update).toHaveBeenCalledWith({
            ...blog,
            likes: 1,
        });
    });

    test("like button calls event handler twice when clicked twice", async () => {
        const blog = {
            id: "1",
            title: "Test Blog",
            author: "Me",
            url: "http://example.com",
            likes: 0,
        };

        const mockHandler = vi.fn();

        render(<Blog blog={blog} onLike={mockHandler} />);

        const user = userEvent.setup();

        await user.click(screen.getByText("view"));

        const likeButton = screen.getByText("like");
        await user.click(likeButton);
        await user.click(likeButton);

        expect(mockHandler).toHaveBeenCalledTimes(2);
    });
});
