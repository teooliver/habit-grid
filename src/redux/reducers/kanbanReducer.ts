import { ActionTypes, Board, KanbanActions } from "../actions/index";

const initialState: Board[] = [
  {
    id: 329840982,
    name: "TestBoard",
    columnns: ["todo", "in progress", "done"],
    issues: [
      {
        id: "1",
        title: "Read Something",
        description: "Read Something for school project",
        boardId: 329840982,
        column: "todo",
      },
      {
        id: "2",
        title: "Read Something",
        description: "Read Something for school project",
        boardId: 329840982,
        column: "todo",
      },
      {
        id: "3",
        title: "Read Something",
        description: "Read Something for school project",
        boardId: 329840982,
        column: "todo",
      },
      {
        id: "4",
        title: "Read Something",
        description: "Read Something for school project",
        boardId: 329840982,
        column: "in progress",
      },
      {
        id: "5",
        title: "Read Something",
        description: "Read Something for school project",
        boardId: 329840982,
        column: "in progress",
      },
      {
        id: "6",
        title: "Read Something",
        description: "Read Something for school project",
        boardId: 329840982,
        column: "in progress",
      },
      {
        id: "7",
        title: "Read Something",
        description: "Read Something for school project",
        boardId: 329840982,
        column: "done",
      },
    ],
  },
];

export const kanbanReducer = (
  state: Board[] = initialState,
  action: KanbanActions
) => {
  switch (action.type) {
    case ActionTypes.getKanbanBoards:
      return state;
    case ActionTypes.createKanbanBoard:
      return state;
    case ActionTypes.createKanbanCard:
      return state;
    default:
      return state;
  }
};
