import Dexie from "dexie";
import { Habit, ViewSelection, Board } from "../redux/actions";

class AppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  habits: Dexie.Table<Habit, number>; // number = type of the primkey
  views: Dexie.Table<ViewSelection, number>;
  boards: Dexie.Table<Board, number>;
  //...other tables goes here...

  constructor() {
    super("AppDatabase");
    var db = this;
    db.version(1).stores({
      habits: "++id, name, events",
      //...other tables goes here...
    });
    db.version(2).stores({
      views: "++id, view",
    });
    db.version(3).stores({
      boards: "++id, name, columns, issues",
    });

    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.habits = this.table("habits");
    this.views = this.table("views");
    this.boards = this.table("boards");
  }
}

export var db = new AppDatabase();
