import { Token } from "./token";

export class Property {
  constructor(public token: Token, public label: string) {}

  toString() {
    return this.token.word;
  }
}
