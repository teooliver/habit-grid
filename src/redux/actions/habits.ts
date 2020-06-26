import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { db, addHabit, gellAllHabits, IHabit } from "../../indexedDb/connectDb";

export interface Habit {
  // id: number;
  name: string;
  events: Date[];
}

export interface GetHabitsAction {
  type: ActionTypes.getHabits;
  payload: IHabit[];
}

export interface RemoveHabitAction {
  type: ActionTypes.removeHabit;
  payload: number;
}

export interface CreateHabitAction {
  type: ActionTypes.createHabit;
  payload: Habit;
}

export const getHabits = (): Function => {
  return async (dispatch: Dispatch) => {
    try {
      const allHabits = await gellAllHabits();
      dispatch<GetHabitsAction>({
        type: ActionTypes.getHabits,
        payload: allHabits,
      });
    } catch (error) {
      // dispatch error
      return;
    }
  };
};

export const createHabit = (formData: string) => async (dispatch: Dispatch) => {
  const newHabit: Habit = {
    name: formData,
    events: [],
  };

  const indexdHabit = await addHabit(newHabit);

  dispatch<CreateHabitAction>({
    type: ActionTypes.createHabit,
    payload: indexdHabit!,
  });
};

export const removeHabit = (id: number): RemoveHabitAction => {
  return {
    type: ActionTypes.removeHabit,
    payload: id,
  };
};
