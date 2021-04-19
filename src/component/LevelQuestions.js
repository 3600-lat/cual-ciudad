import React, { useState } from "react";
import Header from "./Header.js";
import Question from "./Question.js";

export default function LevelQuestions({ questions, returnResult }) {
  const [state, setState] = useState({
    questionNumber: 0,
    answers: [],
    score: 0,
  });
  const { questionNumber, answers, score } = state;
  const question = questions[questionNumber];

  function processAnswers(questionAnswers) {
    const newAnswers = [...answers, questionAnswers];
    const hasFinished = newAnswers.length === questions.length;
    const newState = {
      answers: newAnswers,
      score: score + getPointsFromAnswers(questionAnswers),
    };
    if (hasFinished) {
      returnResult(newState);
    } else {
      setState({
        ...newState,
        questionNumber: questionNumber + 1,
      });
    }
  }

  return (
    <div className="level">
      <header className="game-header">
        <Header score={state.score} />
      </header>
      <Question
        question={question}
        returnAnswers={(questionAnswers) => processAnswers(questionAnswers)}
      />
    </div>
  );
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
