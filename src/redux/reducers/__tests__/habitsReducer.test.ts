import { habitsReducer } from '../habitsReducer';
import { ActionTypes, Habit } from '../../actions/index';

const pointDate = '2021-03-12T15:45:47.074Z';
const newPoint = new Date();
const mockedHabitsInitialState: Habit[] = [
  {
    name: 'Habit Test 01',
    events: [],
    id: 1,
  },
  {
    name: 'Habit Test 02',
    events: [new Date(pointDate)],
    id: 2,
  },
];

describe('Test Habits Reducer', () => {
  it('should handle get all habits', () => {
    expect(
      habitsReducer([], {
        type: ActionTypes.getHabits,
        payload: mockedHabitsInitialState,
      })
    ).toEqual(mockedHabitsInitialState);
  });

  it('should handle create habit', () => {
    expect(
      habitsReducer([], {
        type: ActionTypes.createHabit,
        payload: {
          name: 'New Habit Test',
          events: [],
          id: 0,
        },
      })
    ).toEqual([
      {
        name: 'New Habit Test',
        events: [],
        id: 0,
      },
    ]);
  });

  it('should handle remove habit', () => {
    expect(
      habitsReducer(mockedHabitsInitialState, {
        type: ActionTypes.removeHabit,
        payload: 1,
      })
    ).toEqual([
      {
        name: 'Habit Test 02',
        events: [new Date(pointDate)],
        id: 2,
      },
    ]);
  });

  it('should handle create habit point', () => {
    expect(
      habitsReducer(mockedHabitsInitialState, {
        type: ActionTypes.addPoint,
        payload: {
          name: 'Habit Test 02',
          events: [new Date(pointDate), newPoint],
          id: 2,
        },
      })
    ).toEqual([
      {
        name: 'Habit Test 01',
        events: [],
        id: 1,
      },
      {
        name: 'Habit Test 02',
        events: [new Date(pointDate), newPoint],
        id: 2,
      },
    ]);
  });

  it('should handle remove habit point', () => {
    expect(
      habitsReducer(mockedHabitsInitialState, {
        type: ActionTypes.removePoint,
        payload: {
          name: 'Habit Test 02',
          events: [new Date(pointDate)],
          id: 2,
        },
      })
    ).toEqual([
      {
        name: 'Habit Test 01',
        events: [],
        id: 1,
      },
      {
        name: 'Habit Test 02',
        events: [new Date(pointDate)],
        id: 2,
      },
    ]);
  });
});
