// const Dexie = require('dexie');
// Dexie.dependencies.indexedDB = require('fake-indexeddb');
// Dexie.dependencies.IDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // dexie: 'fake-indexeddb',
    '\\db$': require.resolve('./test/db-mock.js'),
  },
  setupFiles: ['fake-indexeddb/auto'],
};
