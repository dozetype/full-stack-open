const Persons = ({peopleToShow, handleRemove}) =>{
    return (
        <div>
            {peopleToShow.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => handleRemove(person.id, person.name)}>delete</button>
                </p>
            )
            )}
        </div>
    );
}

export default Persons;
