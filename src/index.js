import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import places from "./places.json";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2V2ZXJvYm8iLCJhIjoiY2trdTUxbWplMWs4ZDJxcW4wNDN6eTJ4bCJ9.nCWWPY2Lb8WuEngFH3GKNQ";

// See https://dev.to/justincy/using-mapbox-gl-in-react-d2n
function useMapBox({ onUpdate }) {
  const ref = useRef(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    // Don't create the map until the ref is connected to the container div.
    // Also don't create the map if it's already been created.
    if (ref.current) {
      if (map === null) {
        const map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/severobo/ckku5e4l92qh117n4v7kmg91k",
        });
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(
          new mapboxgl.ScaleControl({ maxWidth: 100, unit: "metric" })
        );
        setMap(map);
      } else {
        onUpdate(map);
      }
    }
  }, [ref, map, onUpdate]);
  return { ref };
}

function Map(props) {
  const onUpdateHandler = (map) => {
    // Add data and events here
    // set the bounds, center and zoom
    const cx = props.place.longitude;
    const cy = props.place.latitude;
    var bounds = [
      [cx - 0.42, cy - 0.42], // Southwest
      [cx + 0.42, cy + 0.42], // Northeast
    ];
    map.setMaxBounds(bounds);
    map.setCenter([cx, cy]);
    map.setZoom(12.5);
  };
  const { ref } = useMapBox({ onUpdate: onUpdateHandler });
  return <div ref={ref} className="map-container" />;
}

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
      // It's not correct to update the state within render() -> Warning: Cannot update during an existing state transition (such as within `render`).
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
          <Map place={question.correct} />
          <div className="hint">Correct answer is {question.correct.name}</div>
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
