import React from "react";
import ReactDOM from "react-dom";
import "../src/styles/styles.scss";
import { App } from "./App";

// Redux
import { createStore, applyMiddleware, Store, Action } from "redux";
import { Provider } from "react-redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { reducers, StoreState } from "./redux/reducers";
import { Actions } from "./redux/actions";
import {logger} from './utils/redux-logger'

// Extract this all this logic to a configStore function
const initialState = {};
const middleWares = [thunk as ThunkMiddleware<StoreState, Actions>]


if(process.env.NODE_ENV !== 'production'){
middleWares.push(logger)
}

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleWares)
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
// serviceWorker.register();
