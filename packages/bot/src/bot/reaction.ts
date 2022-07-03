import { Input } from "../nlp/input";
import { Property } from "../nlp/property";
import { Scan } from "../nlp/scan";
import { Line } from "./line";
import { Result } from "./result";

export type ReactionCallback = (line: Line) => string | never;

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

  call(line: Line): Result {
    for (const label in this.properties) {
      this.properties[label].callback((token) => {
        line.input.addProperty(new Property(token, label));
      });

      this.properties[label].scan(line.input.text);
    }

    let resultText = this.callbackValue(line);

    const pattern = /\#\w+/g;
    resultText = resultText.replace(pattern, (r, c) => {
      const property = line.input.property(r.replace("#", ""));

      return property ? property.token.word : "";
    });

    resultText = resultText
      .split(" ")
      .filter((p) => p != "")
      .join(" ");

    return new Result(resultText);
  }
}
