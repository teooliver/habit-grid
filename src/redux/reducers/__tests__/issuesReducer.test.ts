import { issuesReducer } from '../issuesReducer';
import { ActionTypes } from '../../actions/index';
import { fakeIssues } from '../../../utils/test/fakeDbData';

describe('Test Issues Reducer', () => {
  it('should handle get all Issues', () => {
    expect(
      issuesReducer([], {
        type: ActionTypes.getAllKanbanIssues,
        payload: fakeIssues,
      })
    ).toEqual(fakeIssues);
  });

  it('should handle create Issue', () => {
    expect(
      issuesReducer([], {
        type: ActionTypes.createKanbanIssue,
        payload: fakeIssues[0],
      })
    ).toEqual([fakeIssues[0]]);
  });

  it('should handle edit Issue', () => {
    expect(
      issuesReducer([fakeIssues[0]], {
        type: ActionTypes.editKanbanIssueStatus,
        payload: {
          id: 1,
          title: 'Test Title',
          description: 'Test Description',
          boardId: 1,
          columnId: 2,
        },
      })
    ).toEqual([
      {
        id: 1,
        title: 'Test Title',
        description: 'Test Description',
        boardId: 1,
        columnId: 2,
      },
    ]);
  });

  it('should handle delete Issue', () => {
    expect(
      issuesReducer([fakeIssues[0]], {
        type: ActionTypes.deleteKanbanIssue,
        payload: 1,
      })
    ).toEqual([]);
  });
});
