import { BoardActions, Column, ActionTypes } from "../actions";

export const initialState: Column[] = [
  {
    id: 1,
    title: "todo",
    boardId: 329840982,
  },
  {
    id: 2,
    title: "in progress",
    boardId: 329840982,
  },
  {
    id: 3,
    title: "done",
    boardId: 329840982,
  },
];

export const columnsReducer = (
  state: Column[] = initialState,
  action: BoardActions
) => {
  switch (action.type) {
    // case ActionTypes.getKanbanIssue:
    //   return state;
    // case ActionTypes.createKanbanIssue:
    //   return state;
    // case ActionTypes.editKanbanIssueStatus:
    //   const editedIssue = action.payload;
    //   // const filteredIssue = state[editedIssue.boardId].issues.filter(
    //   //   (issue) => issue.id !== editedIssue.id
    //   // );

    //   return state;
    default:
      return state;
  }
};
