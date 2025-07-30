import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
    const [hidden, setHidden] = useState(true);
    const [likes, setLikes] = useState(blog.likes);

    const updateLikes = async (newLikes) => {
        const newBlog = { ...blog, likes: newLikes };
        try {
            await blogService.update(newBlog);
        } catch (exception) {
            console.log(exception);
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
                        const newLikes = likes + 1;
                        setLikes(newLikes);
                        updateLikes(newLikes);
                    }}
                >
                    like
                </button>
            </div>
            <div>{blog.author}</div>
        </div>
    );
};

export default Blog;
