import React from "react";

function FeedBackButtons(props) {
  return (
    <>
      <h2>Give Feedback</h2>
      <div style={{ display: "flex", columnGap: "0.5em" }}>
        <button onClick={props.incrementGood}>Good</button>
        <button onClick={props.incrementNeutral}>Neutral</button>
        <button onClick={props.incrementBad}>Bad</button>
      </div>
    </>
  );
}

export { FeedBackButtons };
