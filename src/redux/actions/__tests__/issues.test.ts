import { fakeIssues } from '../../../utils/test-utils/fakeDbData';
import {
  getIssues,
  createIssue,
  editIssueStatus,
  removeIssue,
} from '../issues';
import { ActionTypes } from '../types';

jest.mock('../../../indexedDb/connectDb.ts');

describe('Redux::Actions Issues', () => {
  it('getIssues dispatches GetKanbanIssues ', async () => {
    const dispatch = jest.fn();
    await getIssues()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.getAllKanbanIssues,
      payload: fakeIssues,
    });
  });

  it('createIssue dispatches CreateKanbanIssue', async () => {
    const dispatch = jest.fn();
    await createIssue({
      title: 'Test Title',
      description: 'Test Description',
      boardId: 1,
      columnId: 1,
    })(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.createKanbanIssue,
      payload: {
        id: 5,
        title: 'Test Title',
        description: 'Test Description',
        boardId: 1,
        columnId: 1,
      },
    });
  });

  it('editIssue dispatches EditKanbanIssueStatus', async () => {
    const dispatch = jest.fn();
    await editIssueStatus(1, 2)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.editKanbanIssueStatus,
      payload: {
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        boardId: 1,
        columnId: 2,
      },
    });
  });

  it('removeIssue dispatches RemoveKanbanIssue', async () => {
    const dispatch = jest.fn();
    await removeIssue(1)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.deleteKanbanIssue,
      payload: 1,
    });
  });
});
