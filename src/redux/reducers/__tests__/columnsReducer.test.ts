import { columnsReducer } from '../columnsReducer';
import { ActionTypes } from '../../actions/index';
import { fakeColumns } from '../../../utils/test/fakeDbData';

describe('Test Columns Reducer', () => {
  it('should handle get Columns', () => {
    expect(
      columnsReducer([], {
        type: ActionTypes.getKanbanColumns,
        payload: fakeColumns,
      })
    ).toEqual(fakeColumns);
  });

  it('should handle delete Column', () => {
    expect(
      columnsReducer(fakeColumns, {
        type: ActionTypes.deleteKanbanColumn,
        payload: fakeColumns[0].id,
      })
    ).toEqual([fakeColumns[1], fakeColumns[2]]);
  });
});
