import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ viewLabel, hideLabel, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" }; // button to expand
    const showWhenVisible = { display: visible ? "" : "none" }; // expanded content

    const toggleVisibility = () => {
        setVisible(!visible);
    };
    
    useImperativeHandle(ref, () => ({ // Used to only allow parent Use toggleVisibility
        toggleVisibility,
    }));

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
});

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    viewLabel: PropTypes.string.isRequired,
    hideLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Togglable;
