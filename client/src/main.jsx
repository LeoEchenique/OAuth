import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";

// Import the scss file here so it can be use without to import in all component jsx files -> that's why u do the "component_propoerty" methodology, to not collide with other "containers" classes for example

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
