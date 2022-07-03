import nlp from "compromise/three";
import { Input } from "../nlp/input";
import { Pattern } from "../nlp/pattern";
import { parse } from "./../nlp/parse";
import { Conversation } from "./conversation";
import { Line } from "./line";
import { Listener } from "./listener";
import { Reaction } from "./reaction";
import { NoResult, Result } from "./result";
import { Ruleset } from "./ruleset";

export class Bot {
  ruleset: Ruleset = new Ruleset();

  listen(...matches: string[]) {
    const reaction = new Reaction();
    const pattern = new Pattern(...matches);

    this.ruleset.listeners.push(new Listener(pattern, reaction));

    return reaction;
  }

  begin() {
    const conversation = new Conversation(this.ruleset);

    return conversation;
  }
}
