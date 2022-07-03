import { User } from "./user";
import dotenv from "dotenv";
import { Database } from "../database/database";

export interface UserBase {
  findUserByToken(token: string): Promise<User | null>;
  findUserByName(name: string): Promise<User | null>;
  addUser(user: User): Promise<void>;
}

export class DatabaseUserBase implements UserBase {
  constructor(private db: Database) {}

  async open(): Promise<void> {
    dotenv.config();

    return new Promise((resolve) => {
      this.db.query(
        "create table if not exists users (id integer primary key auto_increment, " +
          "name varchar(255), token varchar(255))"
      );

      this.findUserByName("admin").then((user) => {
        if (!user) {
          const user = new User(
            "admin",
            process.env.ADMIN_USER_TOKEN || "default_key"
          );

          this.addUser(user).then(() => {
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  }

  async findUserByToken(token): Promise<User | null> {
    const users = await this.db.query<User>(
      `select * from users where token = '${token}' order by id desc limit 1`,
      (result) => {
        return new User(result["name"], result["token"]);
      }
    );

    return users[0];
  }

  async findUserByName(name: string): Promise<User | null> {
    const users = await this.db.query<User>(
      `select * from users where name = '${name}' order by id desc limit 1`,
      (result) => {
        return new User(result["name"], result["token"]);
      }
    );

    return users[0];
  }

  async addUser(user: User): Promise<void> {
    await this.db.query(
      `insert into users (name, token) values ('${user.name}', '${user.token}')`
    );
  }
}
