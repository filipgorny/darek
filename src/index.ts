import { Bot } from "./bot/bot";
import { server } from "./server/server";

const bot = new Bot();

const reaction = bot.listen(
  "(can)? (you)? (please|should|have to|must)? #Verb (the|a|an)? #Noun (now)?",
  "#Verb #Noun"
);

reaction.property("action").match("#Verb").remove("can");
reaction.property("subject").match("#Noun").remove("you");
reaction.property("prefix").match("(the|a)");

reaction.callback((line) => {
  return "Yes I can #action #prefix #subject";
});

const botServer = server(bot, "http");

botServer.listen();

/*

var stdin = process.openStdin();

const conversation = bot.chat();

stdin.addListener("data", function (d) {
  const line = d.toString().trim();

  const result = conversation.react(line);

  console.log(
    `${result.success ? "[SUCCESS]" : "[FAIL]"}: ${
      result.text ? result.text : "..."
    }`
  );
});
*/
