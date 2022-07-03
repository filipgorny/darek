import { Bot } from "./bot/bot";
import { server } from "./server/server";
import { DatabaseUserBase } from "./server/userbase";
import dotenv from "dotenv";
import { Database } from "./database/database";

const run = async () => {
  dotenv.config();

  const bot = new Bot();
  const database = new Database();

  const userbase = new DatabaseUserBase(database);

  await database.connect({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  await userbase.open();

  const botServer = server(bot, userbase, "http");

  botServer.listen(+process.env.SERVER_PORT || 8055);
};

export { Bot, Database, run };
