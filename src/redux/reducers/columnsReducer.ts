import { ColumnActions, Column, ActionTypes } from '../actions';

export const initialState: Column[] = [
  // {
  //   id: 1,
  //   title: 'todo',
  //   boardId: 329840982,
  // },
  // {
  //   id: 2,
  //   title: 'in progress',
  //   boardId: 329840982,
  // },
  // {
  //   id: 3,
  //   title: 'done',
  //   boardId: 329840982,
  // },
];

export const columnsReducer = (
  state: Column[] = initialState,
  action: ColumnActions
) => {
  switch (action.type) {
    case ActionTypes.getKanbanColumns:
      return action.payload;
    default:
      return state;
  }
};
