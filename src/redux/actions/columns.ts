import { ActionTypes } from './types';
import { db } from '../../indexedDb/connectDb';
import { Dispatch } from 'redux';
import { SetAlert } from './alerts';

export const test = 'test';

export interface Column {
  id: number;
  title: string;
  boardId: number;
}

export interface GetBoardColumns {
  type: ActionTypes.getKanbanColumns;
  payload: Column[];
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
