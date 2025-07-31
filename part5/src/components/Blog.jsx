import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({
    blog,
    blogs,
    setBlogs,
    setErrorMessage,
    setSuccessMessage,
    onLike,
}) => {
    const [hidden, setHidden] = useState(true);
    const [likes, setLikes] = useState(blog.likes);

    const updateLikes = async () => {
        const newLikes = likes + 1;
        setLikes(newLikes);
        const newBlog = { ...blog, likes: newLikes };
        try {
            await blogService.update(newBlog);
            if (onLike) onLike(newBlog);
        } catch (exception) {
            console.log(exception);
        }
    };

    const handleRemove = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {
                await blogService.remove(blog.id);
                setBlogs(blogs.filter((b) => b.id !== blog.id));
                setSuccessMessage(`${blog.title} by ${blog.author} deleted`);
                setTimeout(() => setSuccessMessage(null), 5000);
            } catch (exception) {
                setErrorMessage(`Didn't delete`);
                setTimeout(() => setErrorMessage(null), 5000);
            }
        }
    };

    return hidden ? (
        <div className="blogCSS">
            {blog.title} {blog.author}{" "}
            <button onClick={() => setHidden(false)}>view</button>
        </div>
    ) : (
        <div className="blogCSS">
            <div>
                {blog.title}{" "}
                <button onClick={() => setHidden(true)}>hide</button>
            </div>
            <div>{blog.url}</div>
            <div>
                likes {likes}{" "}
                <button
                    onClick={() => {
                        updateLikes();
                    }}
                >
                    like
                </button>
            </div>
            <div>{blog.author}</div>
            <button onClick={handleRemove}>remove</button>
        </div>
    );
};

export default Blog;
