// import uuid from "uuid";
import { ActionTypes } from "./types";
import { Dispatch } from "redux";

type alertTypes = "success" | "warning" | "error";

export interface Message {
  msg: string;
  alertType: alertTypes;
  id: number;
}

export interface SetAlert {
  type: ActionTypes.setAlert;
  payload: Message;
}

export interface RemoveAlert {
  type: ActionTypes.removeAlert;
  payload: number;
}

export const setAlert = (
  msg: string,
  alertType: alertTypes,
  timeout = 10000
) => (dispatch: Dispatch) => {
  console.log("FROM ALERT ACTION");

  //   const id = uuid.v4();
  // Research a way of creating uuid v4 without the whole lib.
  const id = Math.random();
  dispatch<SetAlert>({
    type: ActionTypes.setAlert,
    payload: { msg, alertType, id },
  });

  setTimeout(() => {
    console.log("sldkjflsdkjfsl");
    dispatch<RemoveAlert>({ type: ActionTypes.removeAlert, payload: id });
  }, timeout);
};
