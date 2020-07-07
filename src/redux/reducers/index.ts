import { combineReducers } from "redux";
import { habitsReducer } from "./habitsReducer";
import { selectMonthYearReducer } from "./selectMonthYearReducer";
import { Habit } from "../actions";

export interface StoreState {
  habits: Habit[];
  selectedMonthYear: { selectedMonth: number; selectedYear: number };
}

export const reducers = combineReducers<StoreState>({
  habits: habitsReducer,
  selectedMonthYear: selectMonthYearReducer,
});
