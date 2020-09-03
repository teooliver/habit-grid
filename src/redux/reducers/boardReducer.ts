import { ActionTypes, Board, BoardActions } from '../actions/index';

export const initialState: Board[] = [];

export const boardReducer = (
  state: Board[] = initialState,
  action: BoardActions
) => {
  switch (action.type) {
    case ActionTypes.getKanbanBoards:
      return [...action.payload];
    case ActionTypes.createKanbanBoard:
      return [...state, action.payload];
    case ActionTypes.deleteKanbanBoard:
      return state.filter((board) => board.id !== action.payload);
    default:
      return state;
  }
};
