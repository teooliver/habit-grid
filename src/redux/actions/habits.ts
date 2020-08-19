import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { db } from "../../indexedDb/connectDb";

export interface Habit {
  id?: number;
  name: string;
  events: Date[];
}

export interface GetHabitsAction {
  type: ActionTypes.getHabits;
  payload: Habit[];
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

export interface DeleteAllHabits {
  type: ActionTypes.deleteAllHabits;
  payload: [];
}

export const getHabits = (): Function => {
  return async (dispatch: Dispatch) => {
    try {
      let allHabits: Habit[] = await db.table("habits").toArray();

      dispatch<GetHabitsAction>({
        type: ActionTypes.getHabits,
        payload: allHabits,
      });
    } catch (error) {
      console.error(error);
      // dispatch error

      return;
    }
  };
};

export const createHabit = (formData: string) => async (dispatch: Dispatch) => {
  try {
    const habit: Habit = {
      name: formData,
      events: [],
    };

    // TODO: check if database exists before addHabit
    let id = await db.table("habits").add(habit);
    const indexdHabit = await db.habits.get(Number(id));

    dispatch<CreateHabitAction>({
      type: ActionTypes.createHabit,
      payload: indexdHabit!,
    });
  } catch (error) {
    console.error(error);
    // dispatch error
  }
};

export const removeHabit = (id: number) => async (dispatch: Dispatch) => {
  try {
    // const habit = await db.habits.get(Number(id));
    await db.table("habits").delete(id);
    dispatch<RemoveHabitAction>({
      type: ActionTypes.removeHabit,
      payload: id,
    });
  } catch (error) {
    console.error(error);
    // dispatch error
  }
};

export const addPoint = (id: number, date: Date) => async (
  dispatch: Dispatch
) => {
  try {
    const habit = await db.habits.get(Number(id));

    if (habit) {
      habit.events.push(date);
      await db.habits.put(habit, id);
    }

    dispatch<CreatePointAction>({
      type: ActionTypes.addPoint,
      payload: habit!,
    });
  } catch (error) {
    console.error(error);
    // dispatch error
  }
};

export const removePoint = (id: number, date: Date) => async (
  dispatch: Dispatch
) => {
  try {
    const habit = await db.habits.get(Number(id));

    if (habit) {
      for (let index = 0; index < habit.events.length; index++) {
        if (habit.events[index].getTime() === date.getTime()) {
          habit.events.splice(index, 1);
        }
      }
      await db.habits.put(habit, id);
    }

    dispatch<RemovePointAction>({
      type: ActionTypes.removePoint,
      payload: habit!,
    });
  } catch (error) {
    console.log(error);
    // dispatch error
  }
};

// Delete all Data
export const deleteAllHabits = () => async (dispatch: Dispatch) => {
  try {
    await db
      .delete()
      .then(() => {
        console.log("Database successfully deleted");
      })
      .catch((err) => {
        console.error("Could not delete database");
      })
      .finally(() => {
        // Do what should be done next...
      });
    dispatch<DeleteAllHabits>({
      type: ActionTypes.deleteAllHabits,
      payload: [],
    });
  } catch (error) {
    console.log(error);
    // dispatch error
  }
};
