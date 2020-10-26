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

const initialState = {};
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk as ThunkMiddleware<StoreState, Actions>)
);

//TODO: get propery type for store
const addLogginToDisptach = (store: any ) => {
  const rawDispatch = store.dispatch;
  if(!console.group){
    return rawDispatch
  }
  // TODO: get propery type for action
  return (action: any) => {
    console.group(action.type);
    console.log('%c prev state', 'color:gray',store.getState());
    console.log('%c action', 'color:blue', action)
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd();
    return returnValue;
  }
}

if(process.env.NODE_ENV !== 'production'){
  store.dispatch = addLogginToDisptach(store)
}


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
