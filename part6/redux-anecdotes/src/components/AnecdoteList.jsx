import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>
        state.anecdote.filter((a) =>
            a.content.toLowerCase().includes(state.filter.toLowerCase()),
        ),
    );
    const dispatch = useDispatch();

    const vote = (id) => {
        console.log("vote", id);
        dispatch(incrementVote(id));
    };

    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};
export default AnecdoteList;
