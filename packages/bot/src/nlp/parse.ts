import { Input } from "./input";
import nlp from "compromise";
import { Token } from "./token";
import { Property } from "./property";

export const match = (patterns: string[]) => (text) => {
  for (const pattern of patterns) {
    let match = nlp(text).match(pattern).text();

    if (match) {
      return new Input(text);
    }
  }
};
export const parse = (patterns: string[], text: string) => {
  const input = match(patterns)(text);

  return input;
};
