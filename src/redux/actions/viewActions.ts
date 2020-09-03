import { Dispatch } from 'redux';
import { ActionTypes, ViewOptions } from './types';
import { db } from '../../indexedDb/connectDb';
import { SetAlert } from './alerts';
import { errorMessages } from '../../utils/errorMessages';

export interface ViewSelection {
  id?: number;
  view: ViewOptions;
}

export interface SelectViewAction {
  type: ActionTypes.selectView;
  payload: ViewOptions;
}

export interface GetViewSelection {
  type: ActionTypes.getViewSelection;
  payload: ViewOptions;
}

export const selectView = (view: ViewOptions) => async (dispatch: Dispatch) => {
  try {
    // Always edit the current view, so there's always only one view value.
    await db.table('views').put({ view: view }, 1);

    dispatch<SelectViewAction>({
      type: ActionTypes.selectView,
      payload: view,
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

export const getViewSelection = () => async (dispatch: Dispatch) => {
  try {
    let views: ViewSelection[] = await db.table('views').toArray();
    let viewSelection = views.pop();
    let view = viewSelection?.view;
    if (view === undefined) {
      // Todo, delete all views and insert the new one, so not to acumulate data and keep only on value
      await db.table('views').add({ view: 'table' });
      view = 'table';
    }

    dispatch<GetViewSelection>({
      type: ActionTypes.getViewSelection,
      payload: view,
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
