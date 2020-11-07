import Dexie from 'dexie';
// require('fake-indexeddb/auto');
const indexedDB = require('fake-indexeddb');
const IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

export const db = new Dexie('MyDatabase', {
  indexedDB: indexedDB,
  IDBKeyRange: IDBKeyRange,
});

db.version(1).stores({
  habits: '++id, name, events',
  views: '++id, view',
  boards: '++id, name, columnIds, issueIds',
  columns: '++id, name',
  issues: '++id, title, description, columnId, boardId',
});

// import Dexie from 'dexie';
// // @ts-ignore there is not a type for the fake indexeddb
// import indexedDB from 'fake-indexeddb';

// class TestDatabase extends Dexie {
//   constructor() {
//     const IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');
//     super('test', {
//       indexedDB: indexedDB,
//       IDBKeyRange: IDBKeyRange,
//     });
//     this.version(1).stores({
//       habits: '++id, name, events',
//       views: '++id, view',
//       boards: '++id, name, columnIds, issueIds',
//       columns: '++id, name',
//       issues: '++id, title, description, columnId, boardId',
//     });
//   }
// }

// export const db = new TestDatabase();
