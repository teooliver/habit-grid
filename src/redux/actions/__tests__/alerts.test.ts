import { setAlert } from '../alerts';
import { ActionTypes } from '../types';

jest.mock('uuid', () => ({
  v4: () => 'some-short-v4-uuid-0',
}));

describe('Redux::Actions Alerts', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should set and remove alert after 1 second', () => {
    const dispatch = jest.fn();
    setAlert('Test Alert', 'success', 1000)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Test Alert',
        alertType: 'success',
        id: 'some-short-v4-uuid-0',
      },
    });

    jest.runAllTimers();
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.removeAlert,
      payload: 'some-short-v4-uuid-0',
    });
  });
});
