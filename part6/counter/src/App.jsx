import { useSelector, useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    const stats = useSelector(state => state)
    //const importantNotes = useSelector(state => state.filter(note => note.important))
    const good = () =>
        dispatch({
            type: "GOOD",
        });
    const ok = () =>
        dispatch({
            type: "OK",
        });

    const bad = () =>
        dispatch({
            type: "BAD",
        });

    const reset = () =>
        dispatch({
            type: "ZERO",
        });

    return (
        <div>
            <button onClick={good}>good</button>
            <button onClick={ok}>ok</button>
            <button onClick={bad}>bad</button>
            <button onClick={reset}>reset stats</button>
            <div>good {stats.good}</div>
            <div>ok {stats.ok}</div>
            <div>bad {stats.bad}</div>
        </div>
    );
};

export default App;
