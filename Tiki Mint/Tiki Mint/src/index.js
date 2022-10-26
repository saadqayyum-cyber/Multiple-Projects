import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { BlockchainContextProvider } from "./Context/BlockchainContext";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <BlockchainContextProvider>
      <App />
    </BlockchainContextProvider>
  </BrowserRouter>
);
