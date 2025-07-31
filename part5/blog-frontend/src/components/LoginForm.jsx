import PropTypes from "prop-types";

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
                        data-testid='username' //must be data-testid for playwright
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    ></input>
                </div>
                <div>
                    password:{" "}
                    <input
                        data-testid='password'
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

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
};
export default LoginForm;
