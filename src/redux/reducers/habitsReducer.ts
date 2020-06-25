import { Habit, GetHabitsAction } from "../actions/index";
import { ActionTypes } from "../actions/types";

export const habitsReducer = (state: Habit[] = [], action: GetHabitsAction) => {
  switch (action.type) {
    case ActionTypes.getHabits:
      return action.payload;
    default:
      return state;
  }
};
