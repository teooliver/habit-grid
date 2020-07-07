import Dexie from "dexie";
import { Habit } from "../redux/actions";

class AppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  habits: Dexie.Table<Habit, number>; // number = type of the primkey
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
