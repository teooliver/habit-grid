import { boardReducer } from '../boardReducer';
import { ActionTypes } from '../../actions/index';
import { fakeBoards } from '../../../utils/test-utils/fakeDbData';

describe('Redux::Test Boards Reducer', () => {
  it('should handle get all boards', () => {
    expect(
      boardReducer([], {
        type: ActionTypes.getKanbanBoards,
        payload: fakeBoards,
      })
    ).toEqual(fakeBoards);
  });

  it('should handle create board', () => {
    expect(
      boardReducer([], {
        type: ActionTypes.createKanbanBoard,
        payload: {
          id: 1,
          name: 'Test Board',
          columnnIds: [4, 5, 6],
        },
      })
    ).toEqual([
      {
        id: 1,
        name: 'Test Board',
        columnnIds: [4, 5, 6],
      },
    ]);
  });

  it('should handle delete board', () => {
    expect(
      boardReducer(fakeBoards, {
        type: ActionTypes.deleteKanbanBoard,
        payload: 1,
      })
    ).toEqual([]);
  });
});
