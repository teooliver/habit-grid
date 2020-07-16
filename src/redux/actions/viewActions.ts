import { ActionTypes, ViewOptions } from "./types";

export interface SelectViewAction {
  type: ActionTypes.selectView;

  payload: ViewOptions;
}

export const selectView = (view: ViewOptions): SelectViewAction => {
  return {
    type: ActionTypes.selectView,
    payload: view,
  };
};
