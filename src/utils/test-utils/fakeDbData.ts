import { Board, Column, Issue } from '../../redux/actions';

export const fakeEventPoint = new Date('2021-03-13T15:16:52.540Z');

// this will have an id equal to 1 inserted by the database on creation
export const fakeHabit = {
  id: 1,
  name: 'fake test data',
  events: [],
};

export const fakeColumns: Column[] = [
  { id: 1, title: 'todo', boardId: 1 },
  { id: 2, title: 'In Progress', boardId: 1 },
  { id: 3, title: 'Done', boardId: 1 },
];

/*
 The next board will be created with 
 the prop columnnIds: [4, 5, 6]  and
 id: 2
*/
export const fakeBoards: Board[] = [
  {
    id: 1,
    name: 'Test Board',
    columnnIds: [1, 2, 3],
  },
];

/*
 All issues will be created in relationship
 with the board of id 1;
*/
export const fakeIssues: Issue[] = [
  {
    id: 1,
    title: 'Test Title',
    description: 'Test Description',
    boardId: 1,
    columnId: 1,
  },
  {
    id: 2,
    title: 'Test Title',
    description: 'Test Description',
    boardId: 1,
    columnId: 1,
  },
  {
    id: 3,
    title: 'Test Title',
    description: 'Test Description',
    boardId: 1,
    columnId: 1,
  },
  {
    id: 4,
    title: 'Test Title',
    description: 'Test Description',
    boardId: 1,
    columnId: 1,
  },
];
