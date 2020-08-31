import { ActionTypes } from "./types";
import { Dispatch } from "redux";
import { db } from "../../indexedDb/connectDb";
import { SetAlert } from "./alerts";

export interface Board {
  id: number;
  name: string;
  columnnIds: number[];
  issueIds: number[];
}

export interface GetBoardsAction {
  type: ActionTypes.getKanbanBoards;
  payload: Board[];
}

export interface CreateKanbanBoard {
  type: ActionTypes.createKanbanBoard;
  payload: Board;
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

export const createBoard = (formData: Partial<Board>) => async (
  dispatch: Dispatch
) => {
  try {
    // Does the api fill the other properties? like issues, if I don supply them?
    const newBoard: Partial<Board> = {
      name: formData.name,
      columnnIds: formData.columnnIds,
      // issues: [],
    };

    let id = await db.table("boards").add(newBoard);
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
