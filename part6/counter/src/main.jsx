import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux"
import reducer from "./reducer";
import App from "./App";

const store = createStore(reducer);


const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
};

renderApp();
store.subscribe(renderApp);
