import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => setNotes(initialNotes))
      .catch((error) => {
        alert(`Error:'${error}''`);
      });
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    let newNoteObj = {
      content: newNote,
      important: Math.random() < 0.5,
      date: new Date().toISOString(),
    };

    noteService.create(newNoteObj).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const newNote = { ...note, important: !note.important };

    noteService
      .update(id, newNote)
      .then((updatedNote) =>
        setNotes(notes.map((note) => (note.id === id ? updatedNote : note)))
      )
      .catch((error) => {
        setErrorMessage(`Note ${note.content} was already removed from server`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {" "}
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportant={toggleImportanceOf}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder="Add notes here"
        />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
