import React, { useState } from "react";
import Question from "./Question.js";

export default function LevelQuestions({ questions, updateResult }) {
  const [state, setState] = useState({
    questionNumber: 0,
    answers: [],
  });
  const { questionNumber, answers } = state;
  const question = questions[questionNumber];

  function processAnswers(questionAnswers) {
    const newAnswers = [...answers, questionAnswers];
    const newState = {
      answers: newAnswers,
    };
    if (newAnswers.length < questions.length) {
      setState({
        ...newState,
        questionNumber: questionNumber + 1,
      });
    }
    updateResult(newState);
  }

  return (
    <div className="level">
      <Question
        question={question}
        returnAnswers={(questionAnswers) => processAnswers(questionAnswers)}
      />
    </div>
  );
}
