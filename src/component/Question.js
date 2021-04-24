import React from "react";
import Map from "./Map.js";
import Action from "./Action.js";

export default function Question({ question, questionAnswers, updateAnswers }) {
  function setAnswer(answer) {
    updateAnswers([...questionAnswers, answer]);
  }

  function getDisabled(option) {
    return questionAnswers.includes(option);
  }
  function getClassName(option) {
    if (!questionAnswers.includes(option)) {
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
