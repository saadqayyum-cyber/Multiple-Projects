import React from "react";
import ReactDOM from "react-dom";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
