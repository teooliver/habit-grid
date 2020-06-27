import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import {
  db,
  addHabit,
  gellAllHabits,
  IHabit,
  createPoint,
  deletePoint,
  deleteHabit,
} from "../../indexedDb/connectDb";

export interface Habit {
  id?: number;
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

export interface CreatePointAction {
  type: ActionTypes.addPoint;
  payload: Habit;
}

export interface RemovePointAction {
  type: ActionTypes.removePoint;
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
  deleteHabit(id);
  return {
    type: ActionTypes.removeHabit,
    payload: id,
  };
};

export const addPoint = (id: number, date: Date) => async (
  dispatch: Dispatch
) => {
  const habit = await createPoint(id, date);

  dispatch<CreatePointAction>({
    type: ActionTypes.addPoint,
    payload: habit!,
  });
};

export const removePoint = (id: number, date: Date) => async (
  dispatch: Dispatch
) => {
  console.log(id, date);
  const habit = await deletePoint(id, date);

  dispatch<RemovePointAction>({
    type: ActionTypes.removePoint,
    payload: habit!,
  });
};
