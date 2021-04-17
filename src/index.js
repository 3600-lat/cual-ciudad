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
        <li key={i} className={d.className}>
          <button onClick={d.onClick} disabled={d.disabled}>
            {d.place.name}
          </button>
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
      stepNumber: 0,
      answers: [],
      questions: initQuestions(),
      score: 0,
    };
  }
  restart() {
    this.setState({
      stepNumber: 0,
      answers: [],
      questions: initQuestions(),
      score: 0,
    });
  }
  goToNextStep() {
    const score = this.state.score + getPointsFromAnswers(this.state.answers);
    this.setState({
      score: score,
      answers: [],
      stepNumber: this.state.stepNumber + 1,
    });
  }
  setAnswer(answer) {
    this.setState({
      answers: [...this.state.answers, answer],
    });
  }
  render() {
    const questions = this.state.questions;
    const stepNumber = this.state.stepNumber;
    const answers = this.state.answers;
    const score = this.state.score;

    const question = questions[stepNumber];
    const hasCorrectAnswer = answers.includes(question.correct);
    if (hasCorrectAnswer) {
      // TODO: after a transition
      this.goToNextStep();
    }

    function getDisabled(option) {
      return hasCorrectAnswer || answers.includes(option);
    }
    function getClassName(option) {
      if (!answers.includes(option)) {
        return "question";
      }
      if (option === question.correct) {
        return "correct";
      }
      return "wrong";
    }

    const options = question.options.map((d, i) => {
      return {
        place: d,
        disabled: getDisabled(d),
        onClick: () => this.setAnswer(d),
        className: getClassName(d),
      };
    });

    return (
      <div className="game">
        <header className="game-header">
          <Header score={score} />
        </header>
        <div className="game-map">
          Correct answer is{" "}
          {
            question.correct.name

            // <Board
            //   squares={current.squares}
            //   onClick={(i) => this.handleClick(i)}
            // />
          }
        </div>
        <div className="game-action">{<Action options={options} />}</div>
      </div>
    );
  }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * from https://stackoverflow.com/a/6274381/7351594
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// from https://stackoverflow.com/a/19270021/7351594
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
function initQuestions() {
  const numOptions = 3;
  return shuffle([...places]).map((d) => {
    // get three random places, and replace one with d
    const options = getRandom(places, numOptions);
    if (options.indexOf(d) === -1) {
      options[numOptions - 1] = d;
    }
    const shuffledOptions = shuffle(options);

    return {
      correct: d,
      options: shuffledOptions,
    };
  });
}
function getPointsFromAnswers(answers) {
  const length = answers.length;
  if (length === 0) {
    throw new Error("Should not be called with an empty array");
  }
  if (length === 1) {
    return 10;
  }
  if (length === 2) {
    return 1;
  }
  return 0;
}
ReactDOM.render(<Game />, document.getElementById("root"));
