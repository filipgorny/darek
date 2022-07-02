export class Pattern {
  private matchesValue: string[] = [];

  constructor(...matches: string[]) {
    this.matchesValue.push(...matches);
  }

  get matches(): string[] {
    return this.matchesValue;
  }
}
