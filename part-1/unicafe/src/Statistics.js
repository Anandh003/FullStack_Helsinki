import React from "react";
import "./statistics.css";

function StatisticsLine({ text, value }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <div>{text}</div>
          </td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}

function Statistics({ goodCount, neutralCount, badCount }) {
  const total = goodCount + neutralCount + badCount;
  const average = Math.abs(goodCount - badCount) / total;
  const positive = (goodCount / total) * 100;

  return (
    <>
      <h2>Statistics</h2>
      {total > 0 ? (
        <>
          <StatisticsLine text="Good" value={goodCount} />

          <StatisticsLine text="Bad" value={badCount} />

          <StatisticsLine text="Neutral" value={neutralCount} />

          <StatisticsLine text="All" value={total} />

          <StatisticsLine text="Average" value={average} />

          <StatisticsLine text="Positive" value={`${positive} %`} />
        </>
      ) : (
        <div>No feedback given</div>
      )}
    </>
  );
}

export { Statistics };
