import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root")); //ReactDOM.render React 18
root.render(
   <AuthContextProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </AuthContextProvider>
);
