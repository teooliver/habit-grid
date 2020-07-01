import { combineReducers } from "redux";
import { habitsReducer } from "./habitsReducer";
import { selectMonthReducer } from "./selectMonthReducer";
import { Habit } from "../actions";

export interface StoreState {
  habits: Habit[];
  selectedMonth: { selectedMonth: number; selectedYear: number };
}

export const reducers = combineReducers<StoreState>({
  habits: habitsReducer,
  selectedMonth: selectMonthReducer,
});
