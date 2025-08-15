const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email text UNIQUE,
            password text,
            CONSTRAINT email_unique UNIQUE (email)
            )`);

        db.run(`CREATE TABLE itr_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            gross_salary REAL,
            deductions_80c REAL,
            FOREIGN KEY (user_id) REFERENCES users (id)
            )`);
    }
});

module.exports = db;
