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
            console.log(user._id);
        } catch (exception) {
            setErrorMessage("Wrong Credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
        console.log(event.target);
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
        <BlogForm/>
    );
    
    return (
        <div>
            <Notification message={errorMessage} good={false} />
            <Notification message={successMessage} good={true} />
            {user ? blogForm() : loginForm()}
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
