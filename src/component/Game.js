import React from "react";
import Level from "./Level.js";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: props.places,
      levels: [
        { numQuestions: 1 },
        { numQuestions: 3 },
        { numQuestions: 7 },
        { numQuestions: 21 },
      ],
      levelNumber: 0,
    };
  }
  toNextLevel() {
    this.setState({
      levelNumber: Math.min(
        this.state.levelNumber + 1,
        this.state.levels.length - 1
      ),
    });
  }
  render() {
    const level = this.state.levels[this.state.levelNumber];
    const places = this.state.places;
    return (
      <div className="game">
        <Level
          level={level}
          places={places}
          toNextLevel={() => this.toNextLevel()}
        />
      </div>
    );
  }
}
