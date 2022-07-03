import mysql from "mysql2";

export type DatabaseConnectionConfig = {
  host: string;
  user: string;
  password: string;
  database: string;
};

export class Database {
  connection: mysql.Connection;

  async connect(config: DatabaseConnectionConfig) {
    return new Promise<void>((resolve, reject) => {
      this.connection = mysql.createConnection(config);

      this.connection.connect((err) => {
        if (err) {
          reject(err);

          return;
        }

        resolve();
      });
    });
  }

  async query<T = null>(query: string, factory?: (result) => T): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.connection.query(query, (err, rows) => {
        if (err) {
          reject();

          return;
        }

        const results = [];

        const resultRows = rows as unknown as mysql.RowDataPacket[];

        if (typeof resultRows["forEach"] == "function") {
          resultRows.forEach((row) => {
            results.push(factory(row));
          });
        }

        resolve(results);
      });
    });
  }
}
