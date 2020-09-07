import { ActionTypes } from './types';
import { Dispatch } from 'redux';
import { db } from '../../indexedDb/connectDb';
import { SetAlert } from './alerts';
import { Column, RemoveKanbanColumn } from './columns';
import { RemoveKanbanIssue } from '.';
import { errorMessages } from '../../utils/errorMessages';

export interface Board {
  id: number;
  name: string;
  columnnIds: number[];
}

export interface CreateBoardFormData {
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

export interface DeleteKanbanBoard {
  type: ActionTypes.deleteKanbanBoard;
  payload: number;
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
        msg: errorMessages.somethingWentWrong,
        alertType: 'error',
      },
    });
    console.error(error);
  }
};

export const createBoard = (formData: CreateBoardFormData) => async (
  dispatch: Dispatch
) => {
  try {
    const newBoard: Partial<Board> = {
      name: formData.boardName,
      columnnIds: [],
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

    dispatch<CreateKanbanBoard>({
      type: ActionTypes.createKanbanBoard,
      payload: indexedBoard!,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: errorMessages.somethingWentWrong,
        alertType: 'error',
      },
    });
    console.log(error);
  }
};

export const removeBoards = (board: Board, boardIssuesIds: number[]) => async (
  dispatch: Dispatch
) => {
  console.log(boardIssuesIds)
  try {
    if (boardIssuesIds) {
      await db.table('issues').bulkDelete(boardIssuesIds);
      for (let issueId of boardIssuesIds) {
        dispatch<RemoveKanbanIssue>({
          type: ActionTypes.deleteKanbanIssue,
          payload: issueId,
        });
      }
    }
    await db.table('columns').bulkDelete(board.columnnIds);
    for (let columnId of board.columnnIds) {
      dispatch<RemoveKanbanColumn>({
        type: ActionTypes.deleteKanbanColumn,
        payload: columnId,
      });
    }

    await db.table('boards').delete(board.id);

    dispatch<DeleteKanbanBoard>({
      type: ActionTypes.deleteKanbanBoard,
      payload: board.id,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: errorMessages.somethingWentWrong,
        alertType: 'error',
      },
    });
    console.error(error);
  }
};
