import React, { useState } from "react";

function PhoneBookForm({ addNewPerson }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onNameChange = (e) => {
    setNewName(e.target.value);
  };

  const onNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <>
      <h2>Add a New</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewPerson(e, newName, newNumber);
          setNewName("");
          setNewNumber("");
        }}
      >
        <div>
          name: <input onChange={onNameChange} value={newName} />
        </div>
        <div>
          number:{" "}
          <input type={"number"} onChange={onNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default PhoneBookForm;
