import {
  CreateHabitAction,
  RemoveHabitAction,
  GetHabitsAction,
  CreatePointAction,
  RemovePointAction,
  DeleteAllHabits,
} from "./habits";
import { SelectMonthAction, SelectYearAction } from "./selectMonthYear";
import { SelectViewAction, GetViewSelection } from "./viewActions";

export enum ActionTypes {
  getHabits,
  addPoint,
  removePoint,
  createHabit,
  removeHabit,
  selectMonth,
  selectYear,
  setAlert,
  removeAlert,
  deleteAllHabits,
  selectView,
  getViewSelection,
}

/// should ViewOptions be a Enum?
export type ViewOptions = "individual" | "table";

export type Action =
  | RemoveHabitAction
  | GetHabitsAction
  | CreateHabitAction
  | CreatePointAction
  | RemovePointAction
  | DeleteAllHabits;

export type CalendarActions = SelectMonthAction | SelectYearAction;

export type ViewActions = SelectViewAction | GetViewSelection;
