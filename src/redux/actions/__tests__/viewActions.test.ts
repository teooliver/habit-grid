import { selectView, getViewSelection } from '../viewActions';
import { ActionTypes } from '../types';

jest.mock('../../../indexedDb/connectDb.ts');

describe('Redux::Actions Columns', () => {
  it('getBoardColumns dispatches GetBoardColumns with "individual" selection ', async () => {
    const dispatch = jest.fn();
    await selectView('individual')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.selectView,
      payload: 'individual',
    });
  });

  it('getBoardColumns dispatches GetBoardColumns with "table" selection ', async () => {
    const dispatch = jest.fn();
    await selectView('table')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.selectView,
      payload: 'table',
    });
  });

  it('getViewSelection dispatches GetViewSelection', async () => {
    const dispatch = jest.fn();
    await selectView('individual')(dispatch);
    await getViewSelection()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.getViewSelection,
      payload: 'individual',
    });

    await selectView('table')(dispatch);
    await getViewSelection()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.getViewSelection,
      payload: 'table',
    });
  });
});
