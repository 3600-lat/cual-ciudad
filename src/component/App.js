import React, { useState } from "react";
import LevelSelector from "./LevelSelector.js";
import Game from "./Game.js";
import GameResult from "./GameResult.js";
import Footer from "./Footer.js";

const games = [];
export default function App({ places }) {
  const [state, setState] = useState({ level: null, game: null });
  function setLevel(level) {
    setState({ ...state, level });
  }
  function setGame(game) {
    games.push(game); // side effect (=> useEffect ?)
    setState({ ...state, game });
  }
  function reset() {
    setState({ ...state, level: null, game: null });
  }

  const { level, game } = state;
  let screen;
  if (level === null) {
    // level selector
    // TODO: pass the previous best score in every level
    screen = <LevelSelector setLevel={(level) => setLevel(level)} />;
  } else if (game === null) {
    // start a new game
    screen = (
      <Game
        level={level}
        places={places}
        handleResult={(game) => setGame(game)}
      />
    );
  } else {
    // show the result
    screen = <GameResult game={game} goToNext={() => reset()} />;
  }

  return (
    <div className="app">
      {screen}
      <footer className="app-footer">
        <Footer />
      </footer>
    </div>
  );
}
