// import uuid from "uuid";
import { ActionTypes } from "./types";
import { Dispatch } from "redux";

export interface Message {
  msg: string;
  alertType: "success" | "warning" | "error";
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

export const setAlert = (msg: string, alertType: any, timeout = 5000) => (
  dispatch: Dispatch
) => {
  //   const id = uuid.v4();
  // Research a way of creating uuid v4 without the whole lib.
  const id = Math.random();
  dispatch<SetAlert>({
    type: ActionTypes.setAlert,
    payload: { msg, alertType, id },
  });

  setTimeout(
    () => dispatch<RemoveAlert>({ type: ActionTypes.removeAlert, payload: id }),
    timeout
  );
};
