import { useState, useEffect } from "react";
import Filter from "./Filter";
import Persons from "./Persons";
import PhoneBookForm from "./PhoneBookForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredPerson = searchText.length
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : persons;

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

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
