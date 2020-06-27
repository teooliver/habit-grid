import {
  CreateHabitAction,
  RemoveHabitAction,
  GetHabitsAction,
  CreatePointAction,
  RemovePointAction,
} from "./habits";

export enum ActionTypes {
  getHabits,
  addPoint,
  removePoint,
  createHabit,
  removeHabit,
  selectMonth,
  setAlert,
  removeAlert,
}

export type Action =
  | RemoveHabitAction
  | GetHabitsAction
  | CreateHabitAction
  | CreatePointAction
  | RemovePointAction;
