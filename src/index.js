import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react/cjs/react.development";
import App from "./App";
import { Provider , crea } from 'react-redux'
import store from "./services/redux/store";



ReactDOM.render(
  (
  <Provider store={store}>
    <App />
  </Provider>  
  ),
  document.getElementById("root")
);
