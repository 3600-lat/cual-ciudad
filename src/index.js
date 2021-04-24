import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import places from "./places.json";
import App from "./component/App.js";

ReactDOM.render(<App places={places} />, document.getElementById("root"));
