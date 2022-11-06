import { useState } from "react";
import Filter from "./Filter";
import Persons from "./Persons";
import PhoneBookForm from "./PhoneBookForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [searchText, setSearchText] = useState("");

  const filteredPerson = searchText.length
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : persons;

  const addNewPerson = (e, newName, newNumber) => {
    e.preventDefault();
    let newNameObj = { name: newName, number: newNumber };
    if (
      persons.find(
        (person) => JSON.stringify(person) === JSON.stringify(newNameObj)
      )
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newNameObj));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} setSearchText={setSearchText} />
      <PhoneBookForm addNewPerson={addNewPerson} />
      <Persons persons={filteredPerson} />
    </div>
  );
};

export default App;
