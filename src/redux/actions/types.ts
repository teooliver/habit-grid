import {
  CreateHabitAction,
  RemoveHabitAction,
  GetHabitsAction,
  CreatePointAction,
  RemovePointAction,
  DeleteAllHabits,
} from './habits';
import { SelectMonthAction, SelectYearAction } from './selectMonthYear';
import { SelectViewAction, GetViewSelection } from './viewActions';
import { SetAlert, RemoveAlert } from './alerts';
import {
  GetBoardsAction,
  CreateKanbanBoard,
  DeleteKanbanBoard,
} from './boards';

import {
  CreateKanbanIssue,
  EditKanbanIssueStatus,
  GetKanbanIssues,
  RemoveKanbanIssue,
} from './issues';

import { GetBoardColumns, RemoveKanbanColumn } from './columns';

export enum ActionTypes {
  getHabits = "GET_HABIT",
  addPoint = "ADD_POINT",
  removePoint = "REMOVE_POINT",
  createHabit = "CREATE_HABIT",
  removeHabit = "REMOVE_HABIT",
  selectMonth = "SELECT_MONTH",
  selectYear = "SELECT_YEAR",
  setAlert = "SET_ALERT",
  removeAlert = "REMOVE_ALERT",
  deleteAllHabits = "DELETE_ALL_HABITS",
  selectView = "SELECT_VIEW",
  getViewSelection = "GET_VIEW_SELECTION",
  getKanbanBoards = "GET_KANBAN_BOARDS",
  createKanbanBoard = "CREATE_KANBAN_BOARD",
  deleteKanbanBoard = "DELETE_KANBAN_BOARD",
  getKanbanColumns = "GET_KANBAN_COLUMNS",
  createKanbanColumn = "CREATE_KANBAN_COLUMN",
  deleteKanbanColumn = "DELETE_KANBAN_COLUMN",
  getAllKanbanIssues = "GET_ALL_KANBAN_ISSUES",
  getKanbanIssue = "GET_KANBAN_ISSUE",
  createKanbanIssue = "CREATE_KANBAN_ISSUE",
  deleteKanbanIssue = "DELETE_KANBAN_ISSUE",
  editKanbanIssueStatus = "EDIT_KANBAN_ISSUE_STATUS",
}

export type ViewOptions = 'individual' | 'table';

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

export type BoardActions =
  | GetBoardsAction
  | CreateKanbanBoard
  | DeleteKanbanBoard;

export type ColumnActions = GetBoardColumns | RemoveKanbanColumn;

export type IssueActions =
  | CreateKanbanIssue
  | EditKanbanIssueStatus
  | GetKanbanIssues
  | RemoveKanbanIssue;

export type Actions =
  | HabitActions
  | CalendarActions
  | ViewActions
  | AlertActions
  | BoardActions
  | IssueActions;
