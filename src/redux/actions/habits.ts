import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { db } from '../../indexedDb/connectDb';
import { setAlert, SetAlert } from './alerts';
import { errorMessages } from '../../utils/errorMessages';

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
}

export const getHabits = () => async (dispatch: Dispatch) => {
  try {
    let allHabits: Habit[] = await db.table('habits').toArray();
    dispatch<GetHabitsAction>({
      type: ActionTypes.getHabits,
      payload: allHabits,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error geting habits, please refresh the app',
        alertType: 'error',
      },
    });
    console.error(error);
  }
};

export const createHabit = (formData: string) => async (dispatch: Dispatch) => {
  try {
    const habit: Habit = {
      name: formData,
      events: [],
    };

    // TODO: check if database exists before addHabit
    let id = await db.table('habits').add(habit);
    const indexedHabit = await db.habits.get(Number(id));

    dispatch<CreateHabitAction>({
      type: ActionTypes.createHabit,
      payload: indexedHabit!,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: 'Error creating a habit, please refresh the app',
        alertType: 'error',
      },
    });
    console.error(error);
  }
};

export const removeHabit = (id: number) => async (dispatch: Dispatch) => {
  try {
    // const habit = await db.habits.get(Number(id));
    await db.table('habits').delete(id);
    dispatch<RemoveHabitAction>({
      type: ActionTypes.removeHabit,
      payload: id,
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: errorMessages.somethingWentWrong,
        alertType: 'error',
      },
    });
    console.error(error);
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
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: errorMessages.somethingWentWrong,
        alertType: 'error',
      },
    });
    console.error(error);
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
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: errorMessages.somethingWentWrong,
        alertType: 'error',
      },
    });
    console.error(error);
  }
};

// TODO: This should go to its own action/reducer and be called deleteAllHabits
//  we could also have a a deleteAllHabits, deleteAllBoards actions etc.
export const deleteAllHabits = () => async (dispatch: Dispatch) => {
  try {
    await db.delete().then(() => {
      // dispatch<SetAlert>({
      //   type: ActionTypes.setAlert,
      //   payload: {
      //     msg: 'All data was deleted',
      //     alertType: 'success',
      //   },
      // });
      dispatch<DeleteAllHabits>({
        type: ActionTypes.deleteAllHabits,
      });

      dispatch<any>(setAlert('All data was deleted', 'success'));
      db.open();
    });
  } catch (error) {
    dispatch<SetAlert>({
      type: ActionTypes.setAlert,
      payload: {
        msg: errorMessages.allDataWasDeleted,
        alertType: 'error',
      },
    });
    console.error(error);
  }
};
