import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Header(props) {
  return (
    <div>
      <div className="header-title-box">
        <h1 className="header-title">¿Cuál ciudad?</h1>
        <span className="header-details">
          Encuentra la ciudad de Bolivia a partir de su forma. Buena suerte.
        </span>
      </div>
      <span className="header-score">
        {props.score.answers.length
          ? `Score: ${props.score.ok} / ${props.score.answers}`
          : "Score: -/-"}
      </span>
    </div>
  );
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ answers: [] }],
    };
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const score = calculateScore(current.answers);

    // const moves = history.map((step, move) => {
    //   const desc = move ? `Go to move ${move}` : "Go to game start";
    //   return (
    //     <li key={move}>
    //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
    //     </li>
    //   );
    // });
    return (
      <div className="game">
        <header className="game-header">
          <Header score={score} />
        </header>
        <div className="game-map">
          {
            // <Board
            //   squares={current.squares}
            //   onClick={(i) => this.handleClick(i)}
            // />
          }
        </div>
        <div className="game-action">
          <div>{}</div>
          {
            // <ol>{moves}</ol>
          }
        </div>
      </div>
    );
  }
}

function calculateScore() {
  return { answers: 5, ok: 3 };
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
