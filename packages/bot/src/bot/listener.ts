import { Pattern } from "../nlp/pattern";
import { Reaction } from "./reaction";

export class Listener {
  constructor(public pattern: Pattern, public reaction: Reaction) {}
}
