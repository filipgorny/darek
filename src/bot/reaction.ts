import { Input } from "../nlp/input";
import { Property } from "../nlp/property";
import { Scan } from "../nlp/scan";
import { Result } from "./result";

export type ReactionCallback = (input: Input) => string | never;

export class Reaction {
  private callbackValue: ReactionCallback = () => null;
  private properties: { [key: string]: Scan } = {};

  constructor() {}

  callback(callback: ReactionCallback) {
    this.callbackValue = callback;

    return this;
  }

  property(label: string) {
    const scan = new Scan();

    this.properties[label] = scan;

    return scan;
  }

  call(input: Input): Result {
    for (const label in this.properties) {
      this.properties[label].callback((token) => {
        input.addProperty(new Property(token, label));
      });

      this.properties[label].scan(input.text);
    }

    const resultText = this.callbackValue(input);

    return new Result(resultText);
  }
}
