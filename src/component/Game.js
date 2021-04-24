import React, { useState } from "react";
import Header from "./Header.js";
import Question from "./Question.js";

export default function Game({ level, places, handleResult }) {
  const [game, setGame] = useState({
    questions: initQuestions(places, level.numQuestions),
    answers: [],
    score: 0,
    questionNumber: 0,
  });
  const { questions, answers, score, questionNumber } = game;
  const question = questions[questionNumber];

  function processAnswers(questionAnswers) {
    const newAnswers = [...answers, questionAnswers];
    const newScore = score + getPointsFromAnswers(questionAnswers);
    if (newAnswers.length === questions.length) {
      setGame({
        questions: initQuestions(places, level.numQuestions),
        answers: [],
        score: 0,
        questionNumber: 0,
      });
      handleResult({ level, questions, answers: newAnswers, score: newScore });
    } else {
      setGame({
        ...game,
        answers: newAnswers,
        score: newScore,
        questionNumber: questionNumber + 1,
      });
    }
  }

  return (
    <div className="level">
      <header className="game-header">
        <Header score={game.score} />
      </header>
      <Question
        question={question}
        returnAnswers={(questionAnswers) => processAnswers(questionAnswers)}
      />
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
