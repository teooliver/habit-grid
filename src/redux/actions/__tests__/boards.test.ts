import { fakeBoards } from '../../../utils/test/fakeDbData';
import { getBoards, createBoard, removeBoards } from '../boards';
import { ActionTypes } from '../types';

jest.mock('../../../indexedDb/connectDb.ts');

const datePoint = new Date();
console.log(datePoint);

describe('Redux::Actions Boards', () => {
  it('getBoards dispatches GetBoardsAction ', async () => {
    const dispatch = jest.fn();
    await getBoards()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.getKanbanBoards,
      payload: fakeBoards,
    });
  });

  it('createBoard dispatches CreateKanbanBoard', async () => {
    const dispatch = jest.fn();
    await createBoard({
      boardName: 'Test Board',
      columnsNames: ['Tasks', 'In Progress', 'Done'],
    })(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.createKanbanBoard,
      payload: {
        id: 2,
        name: 'Test Board',
        columnnIds: [4, 5, 6],
      },
    });
  });

  it('removeBoards dispatches RemoveKanbanIssue, RemoveKanbanColumn and DeleteKanbanBoard ', async () => {
    const dispatch = jest.fn();
    const issueIds = [1, 2, 3, 4];

    await removeBoards(fakeBoards[0], issueIds)(dispatch);

    // for each id in issueIds
    issueIds.forEach((id) => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.deleteKanbanIssue,
        payload: id,
      });
    });

    // for each columon in board.columns
    fakeBoards[0].columnnIds.forEach((id) => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ActionTypes.deleteKanbanColumn,
        payload: id,
      });
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.deleteKanbanBoard,
      payload: fakeBoards[0].id,
    });
  });
});
