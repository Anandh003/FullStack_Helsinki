import { useState, useEffect } from "react";
import Filter from "./Filter";
import Persons from "./Persons";
import PhoneBookForm from "./PhoneBookForm";
import phoneBookService from "./services/phoneBookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filteredPerson = searchText.length
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : persons;

  useEffect(() => {
    phoneBookService
      .getAll()
      .then((returnedDetails) => setPersons(returnedDetails));
  }, []);

  const addNewPerson = (e, newName, newNumber) => {
    e.preventDefault();
    let existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    let newNameObj = { name: newName, number: newNumber };

    if (!existingPerson) {
      phoneBookService.addInfo(newNameObj).then((returnedDetails) => {
        setPersons(persons.concat(returnedDetails));
      });
      return;
    }

    if (existingPerson.number === newNumber) {
      alert(`${newName} - ${newNumber} is already exists`);
      return;
    }

    phoneBookService
      .updateInfo(existingPerson.id, {
        name: existingPerson.name,
        number: newNumber,
      })
      .then((returnedDetails) => {
        setPersons(
          persons.map((person) =>
            person.id === returnedDetails.id ? returnedDetails : person
          )
        );
      });
  };

  const onDeletePerson = (id) => {
    phoneBookService.deleteInfo(id).then((deleteResponse) => {
      if (deleteResponse.status === 200) {
        setPersons(persons.filter((person) => person.id !== id));
      } else {
        alert(`Error: ${deleteResponse.statusText}`);
      }
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} setSearchText={setSearchText} />
      <PhoneBookForm addNewPerson={addNewPerson} />
      <Persons persons={filteredPerson} deletePerson={onDeletePerson} />
    </div>
  );
};

export default App;
