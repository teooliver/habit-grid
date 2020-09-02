import { ActionTypes, Board, BoardActions } from '../actions/index';

export const initialState: Board[] = [
  // {
  //   id: 329840982,
  //   name: 'TestBoard',
  //   columnnIds: [1, 2, 3],
  //   issueIds: [1, 2, 3, 4, 5, 6, 7],
  // },
  // {
  //   id: 3298409824,
  //   name: 'TestBoard',
  //   columnnIds: [1, 2, 3],
  //   issueIds: [8, 9, 10],
  // },
];

export const boardReducer = (
  state: Board[] = initialState,
  action: BoardActions
) => {
  switch (action.type) {
    case ActionTypes.getKanbanBoards:
      return [...action.payload];
    case ActionTypes.createKanbanBoard:
      return [...state, action.payload];
    default:
      return state;
  }
};
