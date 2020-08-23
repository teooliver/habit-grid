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
import { SetAlert, RemoveAlert } from "./alerts";

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
  getKanbanBoards,
  createKanbanBoard,
  deleteKanbanBoard,
  getKanbanColumns,
  createKanbanColumn,
  deleteKanbanColumn,
  getKanbanCards,
  createKanbanCard,
  deleteKanbanCard,
}

/// should ViewOptions be a Enum?
export type ViewOptions = "individual" | "table";

// Rename Action to HabitActions
export type Action =
  | RemoveHabitAction
  | GetHabitsAction
  | CreateHabitAction
  | CreatePointAction
  | RemovePointAction
  | DeleteAllHabits;

export type CalendarActions = SelectMonthAction | SelectYearAction;

export type ViewActions = SelectViewAction | GetViewSelection;

export type AlertActions = SetAlert | RemoveAlert;
