import React, { useState } from "react";
import Header from "./Header.js";
import LevelSelector from "./LevelSelector.js";
import Question from "./Question.js";
import GameResult from "./GameResult.js";
import Footer from "./Footer.js";

// const games = [];
export default function App({ places }) {
  const [state, setState] = useState({
    level: null,
    questions: [],
    answers: [],
    score: 0,
    questionNumber: 0,
  });
  const { level, questions, questionNumber, answers, score } = state;

  function createGame(level) {
    setState({
      ...state,
      level,
      questions: initQuestions(places, level.numQuestions),
      answers: [],
      score: 0,
      questionNumber: 0,
    });
  }
  function processAnswers(questionAnswers) {
    setState({
      ...state,
      answers: [...answers, questionAnswers],
      score: score + getPointsFromAnswers(questionAnswers),
      questionNumber: questionNumber + 1,
    });
  }

  function reset() {
    //games.push(game); // side effect (=> useEffect ?)
    setState({ ...state, level: null });
  }

  const question = questions[questionNumber];

  let main;
  if (level === null) {
    // level selector
    // TODO: pass the previous best score in every level
    main = <LevelSelector setLevel={(level) => createGame(level)} />;
  } else if (state.questions.length === state.answers.length) {
    // show the result
    main = <GameResult game={state} goToNext={() => reset()} />;
  } else {
    // show the question
    main = (
      <Question
        question={question}
        returnAnswers={(questionAnswers) => processAnswers(questionAnswers)}
      />
    );
  }

  return (
    <div className="app">
      <header className="header">
        <Header score={score} />
      </header>
      <main className="main">{main}</main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
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