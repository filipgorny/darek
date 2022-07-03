import nlp from "compromise";
import { Token } from "./token";

export type FoundCallback = (token: Token) => void;

export class Scan {
  private options: { [key: string]: string } = {};
  private foundCallback: FoundCallback = () => {};

  constructor() {}

  match(pattern: string) {
    this.options.match = pattern;

    return this;
  }

  remove(pattern: string) {
    this.options.remove = pattern;

    return this;
  }

  callback(foundCallback: FoundCallback) {
    this.foundCallback = foundCallback;

    return this;
  }

  token(text) {
    let doc = nlp(text);

    if (this.options.remove) {
      doc.remove(this.options.remove);
    }

    let matching = doc.match(this.options.match).text();

    if (!matching) {
      return null;
    }

    return new Token(matching);
  }

  scan(text: string) {
    const token = this.token(text);

    if (token) {
      this.foundCallback(token);
    }
  }
}
