import { useState } from "react";

const Togglable = ({viewLabel, hideLabel, children}) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" }; // button to expand
    const showWhenVisible = { display: visible ? "" : "none" }; // expanded content

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{viewLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button onClick={toggleVisibility}>{hideLabel}</button>
            </div>
        </div>
    );
};

export default Togglable;
