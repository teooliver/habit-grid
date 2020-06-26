import Dexie from "dexie";

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

export const addHabit = async (habit: IHabit) => {
  let id = await db.table("habits").add(habit);
  const newHabit = await db.habits.get(Number(id));
  return newHabit;
};

export const gellAllHabits = async () => {
  let allHabits: IHabit[] = await db.table("habits").toArray();
  return allHabits;
};
