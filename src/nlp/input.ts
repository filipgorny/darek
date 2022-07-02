import { Property } from "./property";
import { Scan } from "./scan";

export class Input {
  private properties: Property[] = [];

  constructor(public text: string) {}

  addProperty(property: Property) {
    this.properties.push(property);
  }

  property(label: string) {
    return this.properties.find((p) => p.label == label);
  }
}
