import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import places from "./places.json";

function Header(props) {
  return (
    <div>
      <div className="header-title-box">
        <h1 className="header-title">¿Cuál ciudad?</h1>
        <span className="header-details">
          Encuentra la ciudad de Bolivia a partir de su forma. Buena suerte.
        </span>
      </div>
      <span className="header-score">{`Score: ${props.score}`}</span>
    </div>
  );
}
class Action extends React.Component {
  render() {
    const buttons = this.props.options.map((d, i) => {
      return (
        <li key={i}>
          <button onClick={(i) => this.props.onClick(i)}>{d}</button>
        </li>
      );
    });
    return <ul>{buttons}</ul>;
  }
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          answers: [],
          options: [
            ...places.slice(0, 2).map((d) => d.name),
            "Santa Cruz de La Sierra",
          ],
        },
      ],
    };
  }
  handleClick(i) {}
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
          {
            <Action
              options={current.options}
              onClick={(i) => this.handleClick(i)}
            />
          }
        </div>
      </div>
    );
  }
}

function calculateScore() {
  return 0;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
