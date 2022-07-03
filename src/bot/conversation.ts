import { Input } from "../nlp/input";
import { v4 as uuid } from "uuid";
import { Line } from "./line";
import { NoResult, Result } from "./result";
import { Ruleset } from "./ruleset";
import nlp from "compromise";
import { Thread } from "./thread";

export class Conversation {
  id: string;
  ruleset: Ruleset;
  thread: Thread;

  constructor(ruleset: Ruleset) {
    this.id = uuid();

    this.ruleset = ruleset;
    this.thread = new Thread();
  }

  consume(text: string) {
    return this.react(text);
  }

  react(text: string): Result | never {
    for (const listener of this.ruleset.listeners) {
      for (const match of listener.pattern.matches) {
        const doc = nlp(text);

        const str = doc.match(match).text();

        const input = new Input(str);
        const line = new Line(input, this.thread);

        if (str) {
          return listener.reaction.call(line);
        }
      }
    }

    return new NoResult();
  }
}
