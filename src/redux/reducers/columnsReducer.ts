import { ColumnActions, Column, ActionTypes } from '../actions';

export const initialState: Column[] = [];

export const columnsReducer = (
  state: Column[] = initialState,
  action: ColumnActions
) => {
  switch (action.type) {
    case ActionTypes.getKanbanColumns:
      return action.payload;
    case ActionTypes.deleteKanbanColumn:
      return state.filter((column) => column.id !== action.payload);
    default:
      return state;
  }
};
