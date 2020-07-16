import { ViewActions, ActionTypes, ViewOptions } from "../actions/types";

export const viewReducer = (
  state: ViewOptions = "table",
  action: ViewActions
) => {
  switch (action.type) {
    case ActionTypes.selectView:
      return action.payload;
    default:
      return state;
  }
};
