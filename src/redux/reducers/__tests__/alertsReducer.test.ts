import { alertReducer } from '../alertsReducer';
import { ActionTypes } from '../../actions/index';

describe('Test Alert Reducer', () => {
  it('should handle setAlert', () => {
    expect(
      alertReducer([], {
        type: ActionTypes.setAlert,
        payload: {
          msg: 'Test Message',
          alertType: 'success',
          id: 'asd-asd-asd-asd',
        },
      })
    ).toEqual([
      {
        msg: 'Test Message',
        alertType: 'success',
        id: 'asd-asd-asd-asd',
      },
    ]);
  });

  it('should handle removeAlert', () => {
    expect(
      alertReducer(
        [
          {
            msg: 'Test Message',
            alertType: 'success',
            id: 'asd-asd-asd-asd',
          },
        ],
        {
          type: ActionTypes.removeAlert,
          payload: 'asd-asd-asd-asd',
        }
      )
    ).toEqual([]);
  });
});
