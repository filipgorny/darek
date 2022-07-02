import { Bot } from "./bot/bot";
import readlien from "readline";

const bot = new Bot();

const reaction = bot.listen(
  "(can)? (you)? (please)? #Verb (the|a)? #Noun",
  "#Verb #Noun"
);

reaction.property("action").match("#Verb").remove("can");
reaction.property("subject").match("#Noun").remove("you");

reaction.callback((input) => {
  return `YES, I can ${input.property("action")} ${input.property("subject")}`;
});

var stdin = process.openStdin();

stdin.addListener("data", function (d) {
  const line = d.toString().trim();

  const result = bot.react(line);

  console.log(
    `${result.success ? "[SUCCESS]" : "[FAIL]"}: ${
      result.text ? result.text : "..."
    }`
  );
});
