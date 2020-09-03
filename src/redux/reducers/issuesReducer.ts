import { IssueActions, Issue, ActionTypes } from '../actions';

export const initialState: Issue[] = [
  // {
  //   id: 1,
  //   title: 'Read Something',
  //   description: 'Read Something for school project',
  //   boardId: 329840982,
  //   columnId: 1,
  // },
  // {
  //   id: 2,
  //   title: 'Read Something',
  //   description: 'Read Something for school project',
  //   boardId: 329840982,
  //   columnId: 1,
  // },
  // {
  //   id: 3,
  //   title: 'Read Something',
  //   description: 'Read Something for school project',
  //   boardId: 329840982,
  //   columnId: 1,
  // },
  // {
  //   id: 4,
  //   title: 'Read Something',
  //   description: 'Read Something for school project',
  //   boardId: 329840982,
  //   columnId: 2,
  // },
  // {
  //   id: 5,
  //   title: 'Read Something',
  //   description: 'Read Something for school project',
  //   boardId: 329840982,
  //   columnId: 2,
  // },
  // {
  //   id: 6,
  //   title: 'Read Something',
  //   description: 'Read Something for school project',
  //   boardId: 329840982,
  //   columnId: 2,
  // },
  // {
  //   id: 7,
  //   title: 'Read Something',
  //   description: 'Read Something for school project',
  //   boardId: 329840982,
  //   columnId: 3,
  // },
  // {
  //   id: 8,
  //   title: 'NO BOARD',
  //   description: 'Read Something for school project',
  //   boardId: 3298409824,
  //   columnId: 3,
  // },
  // {
  //   id: 9,
  //   title: 'NO BOARD',
  //   description: 'Read Something for school project',
  //   boardId: 3298409824,
  //   columnId: 3,
  // },
  // {
  //   id: 10,
  //   title: 'NO BOARD',
  //   description: 'Read Something for school project',
  //   boardId: 3298409824,
  //   columnId: 3,
  // },
];

export const issuesReducer = (
  state: Issue[] = initialState,
  action: IssueActions
) => {
  switch (action.type) {
    case ActionTypes.getAllKanbanIssues:
      console.log('sdfsdfsdfdsfsdfsdf', action.payload);
      return [...action.payload];
    case ActionTypes.createKanbanIssue:
      return [...state, action.payload];
    // case ActionTypes.editKanbanIssueStatus:
    // const editedIssue = action.payload;
    // const filteredIssue = state[editedIssue.boardId].issues.filter(
    //   (issue) => issue.id !== editedIssue.id
    // );
    // return state;
    default:
      return state;
  }
};
