import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./components/contexts/GlobalContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter>
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // </BrowserRouter>
  <BrowserRouter>
       <GlobalContextProvider>
           <App />
       </GlobalContextProvider>
  </BrowserRouter>
);
