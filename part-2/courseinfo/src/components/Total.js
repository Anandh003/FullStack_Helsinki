import React from "react";

function Total({ parts }) {
  return (
    <h3>
      Total of {parts.reduce((value, part) => value + part.exercises, 0)}{" "}
      exercises
    </h3>
  );
}

export default Total;
