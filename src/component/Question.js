import React, { useState } from "react";
import Map from "./Map.js";
import Action from "./Action.js";

export default function Question({ question, returnAnswers }) {
  // better use only one state for the four variables, because they are generally updated together
  const [currentAnswers, setCurrentAnswers] = useState([]);

  function setAnswer(answer) {
    const newCurrentAnswers = [...currentAnswers, answer];
    const hasCorrectAnswer = newCurrentAnswers.includes(question.correct);

    if (hasCorrectAnswer) {
      returnAnswers(newCurrentAnswers);
    } else {
      setCurrentAnswers(newCurrentAnswers);
    }
  }

  function getDisabled(option) {
    return currentAnswers.includes(option);
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
      onClick: () => setAnswer(d),
      className: getClassName(d),
    };
  });

  return (
    <>
      <div className="game-map">
        <Map place={question.correct} />
      </div>
      <div className="game-action">{<Action options={options} />}</div>
    </>
  );
}
