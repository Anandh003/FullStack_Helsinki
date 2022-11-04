import Part from "./Part";

function Content({ parts }) {
  return (
    <ul>
      {parts.map((part) => (
        <Part courseName={part.name} exercise={part.exercises} key={part.id} />
      ))}
    </ul>
  );
}

export default Content;
