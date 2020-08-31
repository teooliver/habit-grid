import { combineReducers } from "redux";
import { habitsReducer } from "./habitsReducer";
import { selectMonthYearReducer } from "./selectMonthYearReducer";
import { viewReducer } from "./viewReducer";
import { Habit, ViewOptions, Message, Board, Issue, Column } from "../actions";
import alertReducer from "./alertsReducer";
import { boardReducer } from "./boardReducer";
import { issuesReducer } from "./issuesReducer";
import { columnsReducer } from "./columnsReducer";

export interface StoreState {
  habits: Habit[];
  selectedMonthYear: { selectedMonth: number; selectedYear: number };
  selectedView: ViewOptions;
  alerts: Message[];
  boards: Board[];
  issues: Issue[];
  columns: Column[];
}

export const reducers = combineReducers<StoreState>({
  habits: habitsReducer,
  selectedMonthYear: selectMonthYearReducer,
  selectedView: viewReducer,
  alerts: alertReducer,
  boards: boardReducer,
  issues: issuesReducer,
  columns: columnsReducer,
});
