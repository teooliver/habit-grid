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
import { GetBoardsAction, CreateKanbanBoard } from "./boards";

import { CreateKanbanIssue, EditKanbanIssueStatus } from "./issues";

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
  editKanbanIssueStatus,
}

/// should ViewOptions be a Enum?
export type ViewOptions = "individual" | "table";

// Rename Action to HabitActions
export type HabitActions =
  | RemoveHabitAction
  | GetHabitsAction
  | CreateHabitAction
  | CreatePointAction
  | RemovePointAction
  | DeleteAllHabits;

export type CalendarActions = SelectMonthAction | SelectYearAction;

export type ViewActions = SelectViewAction | GetViewSelection;

export type AlertActions = SetAlert | RemoveAlert;

export type BoardActions = GetBoardsAction | CreateKanbanBoard;

export type IssueActions = CreateKanbanIssue | EditKanbanIssueStatus;

export type Actions =
  | HabitActions
  | CalendarActions
  | ViewActions
  | AlertActions
  | BoardActions
  | IssueActions;
