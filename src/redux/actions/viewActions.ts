import { Dispatch } from "redux";
import { ActionTypes, ViewOptions } from "./types";
import { db } from "../../indexedDb/connectDb";

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
  // Alaways edit the view, so there's always only one value.
  await db.table("views").put({ view: view }, 1);

  dispatch<SelectViewAction>({
    type: ActionTypes.selectView,
    payload: view,
  });
};

export const getViewSelection = () => async (dispatch: Dispatch) => {
  let views: ViewSelection[] = await db.table("views").toArray();
  let viewSelection = views.pop();
  let view = viewSelection?.view;
  if (view === undefined) {
    await db.table("views").add({ view: "table" });
    view = "table";
  }

  dispatch<GetViewSelection>({
    type: ActionTypes.getViewSelection,
    payload: view,
  });
};
