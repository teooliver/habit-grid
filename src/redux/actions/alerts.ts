import { v4 as uuid } from "uuid";
import { ActionTypes } from "./types";
import { Dispatch } from "redux";

type alertTypes = "success" | "warning" | "error";

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
  timeout = 10000
) => (dispatch: Dispatch) => {
  console.log("FROM ALERT ACTION");

  const id = uuid();
  // const id = Math.random();
  dispatch<SetAlert>({
    type: ActionTypes.setAlert,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    dispatch<RemoveAlert>({ type: ActionTypes.removeAlert, payload: id });
  }, timeout);
};
