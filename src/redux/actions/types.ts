import {
  CreateHabitAction,
  RemoveHabitAction,
  GetHabitsAction,
  CreatePointAction,
  RemovePointAction,
} from "./habits";
import { SelectMonthAction, SelectYearAction } from "./selectMonth";

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
}

export type Action =
  | RemoveHabitAction
  | GetHabitsAction
  | CreateHabitAction
  | CreatePointAction
  | RemovePointAction;

export type CalendarActions = SelectMonthAction | SelectYearAction;
