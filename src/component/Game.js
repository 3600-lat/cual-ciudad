import React, { useState } from "react";
import Level from "./Level.js";
import Footer from "./Footer.js";

export default function Game({ places }) {
  const [levelNumber, setLevelNumber] = useState(0);

  const levels = [
    { numQuestions: 1 },
    { numQuestions: 3 },
    { numQuestions: 7 },
    { numQuestions: 21 },
  ];
  const level = levels[levelNumber];
  const numQuestions = level.numQuestions;

  function returnLevel() {
    setLevelNumber(Math.min(levelNumber + 1, levels.length - 1));
  }
  return (
    <div className="game">
      <Level
        numQuestions={numQuestions}
        places={places}
        returnLevel={() => returnLevel()}
      />
      <footer className="game-footer">
        <Footer />
      </footer>
    </div>
  );
}
