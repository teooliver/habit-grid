import Dexie from "dexie";
import { Habit } from "../redux/actions";

//  Todo: Delete IHabit use Habit interface
export interface IHabit {
  // id: number;
  name: string;
  events: Date[];
}

class AppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  habits: Dexie.Table<IHabit, number>; // number = type of the primkey
  //...other tables goes here...

  constructor() {
    super("AppDatabase");
    var db = this;
    db.version(1).stores({
      habits: "++id, name, events",
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.habits = this.table("habits");
  }
}

export var db = new AppDatabase();

export const gellAllHabits = async () => {
  let allHabits: IHabit[] = await db.table("habits").toArray();
  return allHabits;
};

export const addHabit = async (habit: IHabit) => {
  let id = await db.table("habits").add(habit);
  const newHabit = await db.habits.get(Number(id));
  return newHabit;
};

export const deleteHabit = async (id: number) => {
  const habit = await db.habits.get(Number(id));
  console.log(id);
  await db.table("habits").delete(id);

  return habit;
};

export const createPoint = async (id: number, date: Date) => {
  const habit = await db.habits.get(Number(id));
  console.log("Create Point: ", habit);
  if (habit) {
    // insert date into the events[]
    habit.events.push(date);
    await db.habits.put(habit, id);
    return habit;
  }
};

export const deletePoint = async (id: number, date: Date) => {
  const habit = await db.habits.get(Number(id));
  console.log("old: ", habit);
  if (habit) {
    for (let index = 0; index < habit.events.length; index++) {
      if (habit.events[index].getTime() === date.getTime()) {
        habit.events.splice(index, 1);
      }
    }
    await db.habits.put(habit, id);

    return habit;
  }
};
