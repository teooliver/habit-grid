import { ActionTypes, Board, BoardActions } from "../actions/index";

export const initialState: Board[] = [
  {
    id: 329840982,
    name: "TestBoard",
    columnns: ["todo", "in progress", "done"],
    issueIds: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 3298409824,
    name: "TestBoard",
    columnns: ["todo", "in progress", "done"],
    issueIds: [8, 9, 10],
  },
];

export const kanbanReducer = (
  state: Board[] = initialState,
  action: BoardActions
) => {
  switch (action.type) {
    case ActionTypes.getKanbanBoards:
      return state;
    case ActionTypes.createKanbanBoard:
      return state;
    case ActionTypes.createKanbanCard:
      return state;
    case ActionTypes.editKanbanIssueStatus:
      const editedIssue = action.payload;
      // const filteredIssue = state[editedIssue.boardId].issues.filter(
      //   (issue) => issue.id !== editedIssue.id
      // );

      return state;
    default:
      return state;
  }
};
