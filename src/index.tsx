import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/styles.scss";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { reducers, StoreState } from "./redux/reducers";
import { Action } from "./redux/actions";

const initialState = {};
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk as ThunkMiddleware<StoreState, Action>)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
