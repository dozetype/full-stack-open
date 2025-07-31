import { useState } from "react";
import blogService from "../services/blogs";
const BlogForm = ({ setSuccessMessage, setErrorMessage, blogs, setBlogs}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setURL] = useState("");
    
    const addBlog = async (event) => {
        event.preventDefault();
        const blogObj = {
            title: title,
            author: author,
            url: url,
        };
        try {
            const res = await blogService.create(blogObj);
            
            setBlogs(blogs.concat(res))
            setSuccessMessage(
                `a new blog ${res.title} by ${res.author} added`,
            );
            setTimeout(() => setSuccessMessage(null), 5000);
            setTitle('');
            setAuthor('');
            setURL('');
        } catch (exception) {
            setErrorMessage(`Didn't add`);
            setTimeout(() => setErrorMessage(null), 5000);
        }
    };
    
    return (
        <>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    <label htmlFor="title-input">Title:</label>{" "}
                    <input
                        data-testid="Title"
                        id="title-input"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="author-input">Author:</label>{" "}
                    <input
                        data-testid="Author"
                        id="author-input"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="url-input">URL:</label>{" "}
                    <input
                        data-testid="URL"
                        id="url-input"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setURL(target.value)}
                    ></input>
                </div>
                <button type="submit">Create</button>
            </form>
        </>
    );
};
export default BlogForm;
