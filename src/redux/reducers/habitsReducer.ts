import { ActionTypes, Habit, Action } from "../actions/index";
import { addHabit } from "../../indexedDb/connectDb";

export const habitsReducer = (state: Habit[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.getHabits:
      return action.payload;
    // case ActionTypes.removeHabit:
    //   return state.filter((habit: Habit) => habit.id !== action.payload);
    case ActionTypes.createHabit:
      return [...state, action.payload];
    default:
      return state;
  }
};
