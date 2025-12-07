// backend/src/db.js
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '..', 'data.db');

const db = new Database(DB_PATH, { verbose: console.log });

// Ensure PRAGMA for performance/foreign keys
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');
db.pragma('foreign_keys = ON');

module.exports = db;
