import { useState } from "react";
import { Anecdote, AnecdoteSummary } from "./Anecdote";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0));

  let maxVoteIndex = votes.indexOf(Math.max(...votes));
  let anecdoteWithMaxVote = anecdotes[maxVoteIndex];
  let maxVote = votes[maxVoteIndex];

  const handleVote = () => {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVote(newVotes);
  };

  const handleNext = () => {
    let random = Math.ceil(Math.random() * anecdotes.length - 1);
    setSelected(random);
  };

  return (
    <>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        handleVote={handleVote}
        handleNext={handleNext}
      />

      <AnecdoteSummary
        title="Anecdote with most votes"
        anecdote={anecdoteWithMaxVote}
        vote={maxVote}
      />
    </>
  );
};

export default App;
