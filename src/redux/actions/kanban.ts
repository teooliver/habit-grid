import { ActionTypes } from "./types";
import { Dispatch } from "redux";
import { db } from "../../indexedDb/connectDb";
import { SetAlert } from "./alerts";

export interface Board {
  id?: number;
  name?: string;
  columnns?: string[];
  issues?: Issue[];
}

export interface Issue {
  id?: string;
  title: string;
  description: string;
  boardId: number;
  column: string;
}

export interface GetBoardsAction {
  type: ActionTypes.getKanbanBoards;
  payload: Board[];
}

export interface CreateKanbanBoard {
  type: ActionTypes.createKanbanBoard;
  payload: Board;
}

export interface CreateKanbanIssue {
  type: ActionTypes.createKanbanCard;
  payload: Issue;
}

export const getBoards = () => async (dispatch: Dispatch) => {
  try {
    let allBoards: Board[] = await db.table("boards").toArray();

    dispatch<GetBoardsAction>({
      type: ActionTypes.getKanbanBoards,
      payload: allBoards,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: "Error geting boards, please refresh the app",
        alertType: "error",
      },
    });
    console.error(error);
  }
};

export const createBoard = (formData: Board) => async (dispatch: Dispatch) => {
  try {
    const board: Board = {
      name: formData.name,
      columnns: formData.columnns,
    };

    let id = await db.table("boards").add(board);
    const indexedBoard = await db.boards.get(Number(id));
    dispatch<CreateKanbanBoard>({
      type: ActionTypes.createKanbanBoard,
      payload: indexedBoard!,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: "Error creating a board, please refresh the app",
        alertType: "error",
      },
    });
    console.log(error);
  }
};

export const createIssue = (formData: Issue) => async (dispatch: Dispatch) => {
  try {
    const { boardId } = formData;
    const issue: Issue = {
      title: formData.title,
      description: formData.description,
      boardId: boardId,
      column: formData.column,
    };

    let id = await db.table("issues").add(issue);
    const indexedIssue = await db.issues.get(Number(id));

    dispatch<CreateKanbanIssue>({
      type: ActionTypes.createKanbanCard,
      payload: indexedIssue!,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: "Error creating a issue, please refresh the app",
        alertType: "error",
      },
    });
    console.log(error);
  }
};
