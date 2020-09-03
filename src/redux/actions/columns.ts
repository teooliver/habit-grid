import { ActionTypes } from './types';
import { db } from '../../indexedDb/connectDb';
import { Dispatch, Action } from 'redux';
import { SetAlert } from './alerts';

export interface Column {
  id: number;
  title: string;
  boardId: number;
}

export interface GetBoardColumns {
  type: ActionTypes.getKanbanColumns;
  payload: Column[];
}

export interface RemoveKanbanColumn {
  type: ActionTypes.deleteKanbanColumn;
  payload: number;
}

export const getBoardColumns = () => async (dispatch: Dispatch) => {
  try {
    let allColumns: Column[] = await db.table('columns').toArray();

    dispatch<GetBoardColumns>({
      type: ActionTypes.getKanbanColumns,
      payload: allColumns,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error geting columns, please refresh the app',
        alertType: 'error',
      },
    });
    console.error(error);
  }
};

export const removeColumn = (id: number) => async (dispatch: Dispatch) => {
  try {
    await db.table('issues').delete(id);

    dispatch<RemoveKanbanColumn>({
      type: ActionTypes.deleteKanbanColumn,
      payload: id,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error removing column...',
        alertType: 'error',
      },
    });
    console.log(error);
  }
};
