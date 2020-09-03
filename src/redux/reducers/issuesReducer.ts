import { IssueActions, Issue, ActionTypes } from '../actions';

export const initialState: Issue[] = [];

export const issuesReducer = (
  state: Issue[] = initialState,
  action: IssueActions
) => {
  switch (action.type) {
    case ActionTypes.getAllKanbanIssues:
      return [...action.payload];
    case ActionTypes.createKanbanIssue:
      return [...state, action.payload];
    // case ActionTypes.editKanbanIssueStatus:
    // const editedIssue = action.payload;
    // const filteredIssue = state[editedIssue.boardId].issues.filter(
    //   (issue) => issue.id !== editedIssue.id
    // );
    // return state;
    case ActionTypes.deleteKanbanIssue:
      return state.filter((issue) => issue.id !== action.payload);
    default:
      return state;
  }
};
