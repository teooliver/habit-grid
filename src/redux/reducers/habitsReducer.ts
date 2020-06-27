import { ActionTypes, Habit, Action } from "../actions/index";
import { addHabit } from "../../indexedDb/connectDb";

export const habitsReducer = (state: Habit[] = [], action: Action) => {
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
    default:
      return state;
  }
};
