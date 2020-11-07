import { v4 as uuid } from 'uuid';
import { ActionTypes } from './types';
import { Action, Dispatch, AnyAction } from 'redux';

type alertTypes = 'success' | 'warning' | 'error';

export interface Message {
  msg: string;
  alertType: alertTypes;
  id?: string;
}

export interface SetAlert {
  type: ActionTypes.setAlert;
  payload: Message;
}

export interface RemoveAlert {
  type: ActionTypes.removeAlert;
  payload: string;
}

export const setAlert = (
  msg: string,
  alertType: alertTypes,
  timeout = 5000
) => (dispatch: Dispatch) => {
  const id = uuid();
  dispatch<SetAlert>({
    type: ActionTypes.setAlert,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch<RemoveAlert>({ type: ActionTypes.removeAlert, payload: id });
  }, timeout);
};
