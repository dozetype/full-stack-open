import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toogglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const init = async () => {
                try {
                    const user = JSON.parse(loggedUserJSON);
                    blogService.setToken(user.token);
                    const testObj = {
                        title: "test",
                        author: "test",
                        url: "test",
                    };
                    const res = await blogService.create(testObj);
                    setUser(user);
                    await blogService.remove(res.id);
                } catch (exception) {
                    window.localStorage.removeItem("loggedBlogAppUser");
                    setUser(null);
                    blogService.setToken(null);
                }
            };
            init();
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem(
                "loggedBlogAppUser",
                JSON.stringify(user),
            );
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("Wrong Username or Password");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogOut = () => {
        setUser(null);
        window.localStorage.removeItem("loggedBlogAppUser");
    };

    const loginForm = () => (
        <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
        />
    );

    const blogForm = () => (
        <BlogForm
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
            blogs={blogs}
            setBlogs={setBlogs}
        />
    );

    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={errorMessage} good={false} />
                <Notification message={successMessage} good={true} />
                {loginForm()}
            </div>
        );
    }
    return (
        <div>
            <h2>blogs</h2>
            <p>
                {user.username} logged in{" "}
                <button onClick={handleLogOut}>log out</button>
            </p>
            <Notification message={errorMessage} good={false} />
            <Notification message={successMessage} good={true} />

            <Togglable viewLabel="new blog" hideLabel="cancel">
                {blogForm()}
            </Togglable>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        blogs={blogs}
                        setBlogs={setBlogs}
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                ))}
        </div>
    );
};

export default App;
