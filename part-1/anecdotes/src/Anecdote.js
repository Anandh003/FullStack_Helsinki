import React from "react";

function AnecdoteButtons({ handleVote, handleNext }) {
  return (
    <div style={{ display: "flex", columnGap: "0.5rem" }}>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNext}>next anecdote</button>
    </div>
  );
}

function AnecdoteSummary({ title, anecdote, vote }) {
  return (
    <div>
      <h2>{title}</h2>
      <div style={{ minHeight: "2rem" }}>{anecdote}</div>
      <div style={{ padding: "1rem 0" }}>has {vote} votes</div>
    </div>
  );
}

function Anecdote({ title, anecdote, votes, handleVote, handleNext }) {
  return (
    <div>
      <AnecdoteSummary title={title} anecdote={anecdote} vote={votes} />
      <AnecdoteButtons handleNext={handleNext} handleVote={handleVote} />
    </div>
  );
}

export { Anecdote, AnecdoteSummary };
