import { ActionTypes } from "./types";

export const test = "test";

export interface Column {
  id: number;
  title: string;
  boardId: number;
}

export interface GetBoardColumns {
  type: ActionTypes.getKanbanColumns;
  payload: Column[];
}
