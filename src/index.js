import React from "react";
import ReactDOM from "react-dom/client";

import "./style.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatsContextProvider } from "./context/ChatsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ChatsContextProvider>
      <App />
    </ChatsContextProvider>
  </AuthContextProvider>
);
