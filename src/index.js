import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import places from "./places.json";
import Game from "./component/Game.js";

ReactDOM.render(<Game places={places} />, document.getElementById("root"));
