import {useState} from "react";


const BlogForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setURL] = useState("");
    const addBlog = () => {
        const blogObj = {
            title: title,
            author: author,
            url: url,
            user: user._id
        }
    }
    return (
        <form onSubmit={addBlog}>
            <div>
                Title:{" "}
                <input
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                ></input>
            </div>
            <div>
                Author:{" "}
                <input
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                ></input>
            </div>
            <div>
                URL:{" "}
                <input
                    value={url}
                    name="URL"
                    onChange={({ target }) => setURL(target.value)}
                ></input>
            </div>
            <button type="submit">Add new blog</button>
        </form>
    );
};
export default BlogForm;
