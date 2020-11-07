import Dexie from 'dexie';
import { Habit, ViewSelection, Board, Issue, Column } from '../redux/actions';

export class AppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  habits: Dexie.Table<Habit, number>; // number = type of the primkey
  views: Dexie.Table<ViewSelection, number>;
  boards: Dexie.Table<Board, number>;
  issues: Dexie.Table<Issue, number>;
  columns: Dexie.Table<Column, number>;
  //...other tables goes here...

  constructor() {
    super('AppDatabase');
    var db = this;
    db.version(1).stores({
      habits: '++id, name, events',
      //...other tables goes here...
    });
    db.version(2).stores({
      views: '++id, view',
    });
    db.version(3).stores({
      boards: '++id, name, columnIds, issueIds',
      columns: '++id, name',
      issues: '++id, title, description, columnId, boardId',
    });

    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.habits = this.table('habits');
    this.views = this.table('views');
    this.boards = this.table('boards');
    this.columns = this.table('columns');
    this.issues = this.table('issues');
  }
}

export var db = new AppDatabase();
