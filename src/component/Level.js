import React, { useState } from "react";
import Modal from "./Modal.js";
import LevelQuestions from "./LevelQuestions.js";

export default function Level({ places, numQuestions, returnLevel }) {
  // better use only one state for the four variables, because they are generally updated together
  const [result, setResult] = useState(null);

  const questions = initQuestions(places, numQuestions);
  console.log(result);

  function processQuestionsResult({ answers, score }) {
    setResult({ score });
  }
  function toNextLevel() {
    setResult(null);
    returnLevel();
  }

  return (
    <div className="level">
      {result === null ? (
        <LevelQuestions
          questions={questions}
          returnResult={({ answers, score }) =>
            processQuestionsResult({ answers, score })
          }
        />
      ) : (
        <Modal score={result.score} toNextLevel={toNextLevel} />
      )}
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
