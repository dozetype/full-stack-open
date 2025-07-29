import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
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

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });
            setUser(user);
        } catch (exception) {
            setErrorMessage("Wrong Credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
        setUsername("");
        setPassword("");
    };

    const handleLogOut = () => {
        setUser(null);
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

    const blogForm = () => <BlogForm user={user} />;

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

            {blogForm()}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
