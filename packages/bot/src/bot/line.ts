import { Input } from "../nlp/input";
import { Thread } from "./thread";

export class Line {
  date: Date;

  constructor(public input: Input, thread: Thread) {
    this.date = new Date();
  }
}
