import { ActionTypes, Board, KanbanActions } from "../actions/index";

// Todo Create KanbanActions
export const kanbanReducer = (state: Board[] = [], action: KanbanActions) => {
  switch (action.type) {
    case ActionTypes.getKanbanBoards:
      return state;
    case ActionTypes.createKanbanBoard:
      return state;
    case ActionTypes.createKanbanCard:
      return state;
  }
};
