const Filter = ({filter, fn}) => {
    return(
        <div>
            filter shown with{" "}
            <input value={filter} onChange={fn} />
        </div>
    )
}

export default Filter;
