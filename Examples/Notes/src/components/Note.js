const Note = ({ note, toggleImportant }) => {
  const label = note.important ? "Make not important" : "make important";
  return (
    <li>
      {note.content}
      <button onClick={() => toggleImportant(note.id)}>{label}</button>
    </li>
  );
};

export default Note;
