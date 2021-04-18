import React from "react";
import Header from "./Header.js";
import Map from "./Map.js";
import Footer from "./Footer.js";
import Action from "./Action.js";

export default class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: props.level,
      questions: initQuestions(props.places, 3),
      stepNumber: 0,
      answers: [],
      currentAnswers: [],
      score: 0,
    };
  }
  goToNextStep(currentAnswers) {
    const score = this.state.score + getPointsFromAnswers(currentAnswers);
    const answers = [...this.state.answers, currentAnswers];

    const statePatch = {
      score: score,
      answers,
      currentAnswers,
    };

    const hasFinished = answers.length === this.state.questions.length;
    if (!hasFinished) {
      // don't increment if it was the last one, in order to show the las question behind the modal
      statePatch.stepNumber = this.state.stepNumber + 1;
      statePatch.currentAnswers = [];
    }

    this.setState(statePatch);
  }
  setAnswer(answer) {
    const questions = this.state.questions;
    const stepNumber = this.state.stepNumber;
    const question = questions[stepNumber];

    const currentAnswers = [...this.state.currentAnswers, answer];
    const hasCorrectAnswer = currentAnswers.includes(question.correct);

    if (hasCorrectAnswer) {
      this.goToNextStep(currentAnswers);
    } else {
      this.setState({
        currentAnswers,
      });
    }
  }
  render() {
    const questions = this.state.questions;
    //const answers = this.state.answers;
    const stepNumber = this.state.stepNumber;
    const currentAnswers = this.state.currentAnswers;

    const score = this.state.score;
    const question = questions[stepNumber];
    // only for the last question of the quiz
    const hasCorrectAnswer = currentAnswers.includes(question.correct);

    function getDisabled(option) {
      return hasCorrectAnswer || currentAnswers.includes(option);
    }
    function getClassName(option) {
      if (!currentAnswers.includes(option)) {
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
      <div className="level">
        <header className="game-header">
          <Header score={score} />
        </header>
        <div className="game-map">
          <Map place={question.correct} />
        </div>

        <div className="game-action">{<Action options={options} />}</div>
        <footer className="game-footer">
          <Footer />
        </footer>
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
function initQuestions(places, numQuestions) {
  const numOptions = 3;
  return shuffle([...places])
    .slice(0, numQuestions)
    .map((d) => {
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
