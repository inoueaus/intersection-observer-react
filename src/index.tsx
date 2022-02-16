import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// @ts-expect-error
const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(<App />);
