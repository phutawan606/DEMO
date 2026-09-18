const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'warranty.sqlite');
const schemaPath = path.resolve(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    db.exec(schema, (execErr) => {
      if (execErr) console.error('Error initializing schema:', execErr.message);
    });
  }
});

module.exports = db;