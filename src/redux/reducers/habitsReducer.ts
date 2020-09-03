import { ActionTypes, Habit, HabitActions } from '../actions/index';

export const habitsReducer = (state: Habit[] = [], action: HabitActions) => {
  switch (action.type) {
    case ActionTypes.getHabits:
      return action.payload;
    case ActionTypes.removeHabit:
      return state.filter((habit: Habit) => habit.id !== action.payload);
    case ActionTypes.createHabit:
      return [...state, action.payload];
    case ActionTypes.addPoint:
      return state.map((habit) => {
        return habit.id === action.payload.id ? action.payload : habit;
      });
    case ActionTypes.removePoint:
      return state.map((habit) => {
        return habit.id === action.payload.id ? action.payload : habit;
      });
    case ActionTypes.deleteAllHabits:
      return [];
    default:
      return state;
  }
};
