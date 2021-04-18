import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import places from "./places.json";
import Level from "./component/Level.js";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [{ questions: 3 }, { questions: 7 }, { questions: 21 }],
      levelNumber: 0,
    };
  }
  render() {
    const level = this.state.levels[this.state.levelNumber];
    return (
      <div className="game">
        <Level level={level} places={places} />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
