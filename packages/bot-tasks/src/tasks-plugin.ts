import { Plugin, Bot, Database } from "bot";
import { Task } from "task";

const addTask = (bot: Bot) => {
  const reaction = bot.listen("Add task * (for) (@)(#Noun|#Person)");

  //reaction.call((line) => {});
};

export class TasksPlugin extends Plugin {
  constructor(private db: Database) {
    super();
  }

  async configure(bot: Bot) {
    await this.db.query(
      "create table if not exists tasks" +
        "( id int primary key auto_increment, description varchar(255), added datetime)"
    );

    const addTaskReaction = bot.listen("Add task *");
    addTaskReaction.property("description").match("*");

    addTaskReaction.callback((line) => {
      const description = line.input.property("description").token.word;

      const task = new Task(description);

      this.db.query(
        `insert into tasks (description, added) values ('${task.description}', now)`
      );

      return "Added task #description";
    });
  }
}
