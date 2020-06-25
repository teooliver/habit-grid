import { combineReducers } from "redux";
import { habitsReducer } from "./habitsReducer";
import { Habit } from "../actions";

export interface StoreState {
  habits: Habit[];
}

export const reducers = combineReducers<StoreState>({
  habits: habitsReducer,
});

