// if testing, use this db intead.
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
