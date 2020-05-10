import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { reducer } from "./redux/reducers";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
