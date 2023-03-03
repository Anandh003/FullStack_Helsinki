import React from "react";

function Person({ person, deletePerson }) {
  const onClickDelete = () => {
    const canDelete = window.confirm(`Delete ${person.name} ?`);
    console.log(canDelete);
    if (canDelete) deletePerson(person.id);
  };

  return (
    <div>
      <span>{`${person.name} ${person.number}`}</span>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
}

function Persons({ persons, deletePerson }) {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </>
  );
}

export default Persons;
