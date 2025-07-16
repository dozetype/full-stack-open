import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        //Rendering
        personsService.getAll().then((response) => {
            setPersons(response);
        });
    }, []);
    console.log("render", persons.length, "notes");

    const addPerson = (event) => {
        // adding
        event.preventDefault();
        if (persons.some((person) => person.name === newName)) {
            console.log("already exist");
            alert(`${newName} is already added to phonebook`);
        } else {
            const newPerson = {
                name: newName,
                number: newNumber,
                id: String(persons.length + 1),
            };
            personsService
                .create(newPerson)
                .then((returnedPersons) =>
                    setPersons(persons.concat(returnedPersons)),
                );
        }
        setNewName("");
        setNewNumber("");
    };

    const handleNameInputChange = (event) => {
        setNewName(event.target.value);
    };

    const handleFilterInputChange = (event) => {
        setFilter(event.target.value);
    };

    const handleNumberInputChange = (event) => {
        setNewNumber(event.target.value);
    };

    const peopleToShow =
        filter === ""
            ? persons
            : persons.filter((person) =>
                  person.name.toLowerCase().includes(filter.toLowerCase()),
              );

    const handleRemove = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personsService.remove(id).then(() => {
                setPersons((response) =>
                    response.filter((person) => person.id !== id),
                );
            });
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} fn={handleFilterInputChange} />

            <h3>add a new</h3>
            <PersonForm
                addPerson={addPerson}
                handleNameInputChange={handleNameInputChange}
                handleNumberInputChange={handleNumberInputChange}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <Persons peopleToShow={peopleToShow} handleRemove={handleRemove} />
        </div>
    );
};

export default App;
