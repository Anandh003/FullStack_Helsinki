import { useState } from "react";
import { FeedBackButtons } from "./FeedBackButtons";
import { Statistics } from "./Statistics";

function App() {
  const [goodCount, setGoodCount] = useState(0);
  const [badCount, setBadCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);

  const increamentGoodCount = () => setGoodCount(goodCount + 1);
  const incrementBadCount = () => setBadCount(badCount + 1);
  const incrementNeutralCount = () => setNeutralCount(neutralCount + 1);

  return (
    <>
      <FeedBackButtons
        incrementGood={increamentGoodCount}
        incrementBad={incrementBadCount}
        incrementNeutral={incrementNeutralCount}
      />
      <Statistics
        goodCount={goodCount}
        badCount={badCount}
        neutralCount={neutralCount}
      />
    </>
  );
}

export default App;
