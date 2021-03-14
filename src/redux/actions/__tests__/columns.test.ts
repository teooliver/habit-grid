import { fakeColumns } from '../../../utils/test/fakeDbData';
import { getBoardColumns, removeColumn } from '../columns';
import { ActionTypes } from '../types';

jest.mock('../../../indexedDb/connectDb.ts');

describe('Redux::Actions Columns', () => {
  it('getBoardColumns dispatches GetBoardColumns ', async () => {
    const dispatch = jest.fn();
    await getBoardColumns()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.getKanbanColumns,
      payload: fakeColumns,
    });
  });

  it('removeColumn dispatches RemoveKanbanColumn ', async () => {
    const dispatch = jest.fn();
    await removeColumn(1)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.deleteKanbanColumn,
      payload: 1,
    });
  });
});
