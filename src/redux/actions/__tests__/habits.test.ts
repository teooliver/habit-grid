import { fakeEventPoint } from '../../../utils/test-utils/fakeDbData';
import { createHabit, removeHabit, addPoint, removePoint } from '../habits';
import { ActionTypes } from '../types';

jest.mock('../../../indexedDb/connectDb.ts');

describe('Redux::Actions Habits', () => {
  it('createHabit call dispatches CreateHabitAction', async () => {
    const dispatch = jest.fn();
    await createHabit('new habit')(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.createHabit,
      payload: {
        events: [],
        id: 2,
        name: 'new habit',
      },
    });
  });

  it('removeHabit call dispatches RemoveHabitAction', async () => {
    const dispatch = jest.fn();
    await removeHabit(2)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.removeHabit,
      payload: 2,
    });
  });

  it('addPoint dispatches CreatePointAction', async () => {
    const dispatch = jest.fn();

    await addPoint(1, fakeEventPoint)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.addPoint,
      payload: {
        events: [fakeEventPoint],
        id: 1,
        name: 'fake test data',
      },
    });
  });

  // TODO: Make this test independent of previous one
  it('removePoint dispatches RemovePointAction', async () => {
    const dispatch = jest.fn();

    await removePoint(1, fakeEventPoint)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionTypes.removePoint,
      payload: {
        events: [],
        id: 1,
        name: 'fake test data',
      },
    });
  });
});
