import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const StatisticLine = (props) => (
    <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr>
);

const Statistis = ({ good, neutral, bad, total }) => {
    if (total == 0) {
        return (
            <>
                <h1>Stats</h1>
                <div>No Feedback Given</div>
            </>
        );
    }
    return (
        <>
            <h1>Stats</h1>
            <table>
                <tbody>
                    <StatisticLine text={"GOOD"} value={good} />
                    <StatisticLine text={"Neutral"} value={neutral} />
                    <StatisticLine text={"BAD"} value={bad} />
                    <StatisticLine text={"ALL"} value={total} />
                    <StatisticLine
                        text={"AVERAGE"}
                        value={(good + bad * -1) / total}
                    />
                    <StatisticLine
                        text={"POSITIVE"}
                        value={(good / total) * 100 + " %"}
                    />
                </tbody>
            </table>
        </>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [total, setTotal] = useState(0);

    const setToGood = () => {
        setGood(good + 1);
        setTotal(total + 1);
    };
    const setToNeutral = () => {
        setNeutral(neutral + 1);
        setTotal(total + 1);
    };
    const setToBad = () => {
        setBad(bad + 1);
        setTotal(total + 1);
    };

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button onClick={() => setToGood(good)} text={"Good"} />
            <Button onClick={() => setToNeutral(neutral)} text={"Neutral"} />
            <Button onClick={() => setToBad(bad)} text={"Bad"} />
            <Statistis good={good} neutral={neutral} bad={bad} total={total} />
        </div>
    );
};

export default App;
