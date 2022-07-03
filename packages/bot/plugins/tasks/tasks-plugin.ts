import { Plugin } from "../../src/plugin/plugin";
import { Bot } from "../../src/bot/bot";
import sqlite3 from "sqlite3";

const addTask = (db: sqlite3.Database, bot: Bot) => {
  const reaction = bot.listen("Add task * (for) (@)(#Noun|#Person)");

  reaction.call((line) => {});
};

export class TasksPlugin extends Plugin {
  configure(bot: Bot) {}
}
