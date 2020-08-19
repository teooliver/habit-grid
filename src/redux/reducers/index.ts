import { combineReducers } from "redux";
import { habitsReducer } from "./habitsReducer";
import { selectMonthYearReducer } from "./selectMonthYearReducer";
import { viewReducer } from "./viewReducer";
import { Habit, ViewOptions, Message } from "../actions";
import alertReducer from "./alertsReducer";

export interface StoreState {
  habits: Habit[];
  selectedMonthYear: { selectedMonth: number; selectedYear: number };
  selectedView: ViewOptions;
  alerts: Message[];
}

export const reducers = combineReducers<StoreState>({
  habits: habitsReducer,
  selectedMonthYear: selectMonthYearReducer,
  selectedView: viewReducer,
  alerts: alertReducer,
});
