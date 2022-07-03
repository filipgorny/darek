import sqlite3 from "sqlite3";
import dotenv from "dotenv";

export class TaskBase {
  db: sqlite3.Database;

  constructor() {}

  async open(filename = ":memory"): Promise<void> {
    dotenv.config();

    this.db = new sqlite3.Database(filename);

    return new Promise((resolve) => {
      this.db.serialize(() => {
        this.db.run(
          "create table if not exists tasks (id integer primary key autoincrement, " +
            "description varchar(255), assigne varchar(255))"
        );

        resolve();
      });
    });
  }

  async close() {
    this.db.close();
  }
}
