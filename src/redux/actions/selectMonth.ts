import { ActionTypes } from "./types";

export interface SelectMonthAction {
  type: ActionTypes.selectMonth;
  payload: number;
}

export const selectMonth = (month: number): SelectMonthAction => {
  return {
    type: ActionTypes.selectMonth,
    payload: month,
  };
};
