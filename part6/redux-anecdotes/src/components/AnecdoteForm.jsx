import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    
    const create = (event) => {
        event.preventDefault();
        const content = event.target.NewAnecdote.value;
        event.target.NewAnecdote.value = "";
        dispatch(createAnecdote(content));
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div>
                    <input name="NewAnecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;
