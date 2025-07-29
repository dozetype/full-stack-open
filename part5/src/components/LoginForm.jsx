const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
}) => {
    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    username:{" "}
                    <input
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    ></input>
                </div>
                <div>
                    password:{" "}
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    ></input>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
};
export default LoginForm;
