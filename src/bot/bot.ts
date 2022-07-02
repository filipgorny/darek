import nlp from "compromise/three";
import { Input } from "../nlp/input";
import { Pattern } from "../nlp/pattern";
import { parse } from "./../nlp/parse";
import { Reaction } from "./reaction";
import { NoResult, Result } from "./result";

class PatternListener {
  constructor(public pattern: Pattern, public reaction: Reaction) {}
}

export class Bot {
  public listeners: PatternListener[] = [];

  listen(...matches: string[]) {
    const reaction = new Reaction();
    const pattern = new Pattern(...matches);

    this.listeners.push(new PatternListener(pattern, reaction));

    return reaction;
  }

  react(text: string): Result | never {
    for (const listener of this.listeners) {
      for (const match of listener.pattern.matches) {
        const doc = nlp(text);

        const str = doc.match(match).text();

        if (str) {
          return listener.reaction.call(new Input(str));
        }
      }
    }

    return new NoResult();
  }
}
