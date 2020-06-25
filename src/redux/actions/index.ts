import { Dispatch } from "redux";
import { ActionTypes } from "./types";

export interface Habit {
  name: string;
  events: Date[];
}

export interface GetHabitsAction {
  type: ActionTypes.getHabits;
  payload: Habit[];
}

export const getHabits = () => {
  const fakeHabit: Habit = {
    name: "Jogging",
    events: [new Date()],
  };
  window.name = "lskdj";
  console.log(window.name);
  return async (dispatch: Dispatch) => {
    dispatch<GetHabitsAction>({
      type: ActionTypes.getHabits,
      payload: [fakeHabit],
    });
  };
};
