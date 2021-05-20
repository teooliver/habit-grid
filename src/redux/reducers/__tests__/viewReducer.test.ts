import { viewReducer } from '../viewReducer';
import { ActionTypes } from '../../actions/index';

describe('Redux::Test View Reducer', () => {
  it('should handle change view style', () => {
    expect(
      viewReducer('table', {
        type: ActionTypes.selectView,
        payload: 'table',
      })
    ).toEqual('table');
  });

  it('should handle change to individual view sytle', () => {
    expect(
      viewReducer('table', {
        type: ActionTypes.selectView,
        payload: 'individual',
      })
    ).toEqual('individual');
  });

  it('should handle change to table view sytle', () => {
    expect(
      viewReducer('individual', {
        type: ActionTypes.selectView,
        payload: 'table',
      })
    ).toEqual('table');
  });
});
