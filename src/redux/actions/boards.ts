import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import { db } from '../../indexedDb/connectDb';
import { SetAlert } from './alerts';
import { Column } from './columns';
import { isArray } from 'util';

export interface Board {
  id: number;
  name: string;
  columnnIds: number[];
  issueIds: number[];
}

interface CreateBoardForm {
  boardName: string;
  columnsNames: string[];
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
    let allBoards: Board[] = await db.table('boards').toArray();

    dispatch<GetBoardsAction>({
      type: ActionTypes.getKanbanBoards,
      payload: allBoards,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error geting boards, please refresh the app',
        alertType: 'error',
      },
    });
    console.error(error);
  }
};

export const createBoard = (formData: CreateBoardForm) => async (
  dispatch: Dispatch
) => {
  console.log(formData);
  try {
    // Does the api fill the other properties? like issues, if I don supply them?
    const newBoard: Partial<Board> = {
      name: formData.boardName,
      columnnIds: [],
      issueIds: [],
    };
    let newBoardId = await db.table('boards').add(newBoard);

    const columnIds = (await Promise.all(
      formData.columnsNames.map(async (colName) => {
        let newColumn: Partial<Column> = {
          title: colName,
          boardId: Number(newBoardId),
        };
        let newColumnId = await db.table('columns').add(newColumn);
        return newColumnId;
      })
    )) as number[];

    newBoard.columnnIds = [...columnIds];
    await db.boards.update(Number(newBoardId), newBoard);

    const indexedBoard = await db.boards.get(Number(newBoardId));
    console.log(indexedBoard);
    dispatch<CreateKanbanBoard>({
      type: ActionTypes.createKanbanBoard,
      payload: indexedBoard!,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error creating a board, please refresh the app',
        alertType: 'error',
      },
    });
    console.log(error);
  }
};
