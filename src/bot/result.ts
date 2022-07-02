export class Result {
  success = true;

  constructor(public text?: string) {}
}

export class NoResult extends Result {
  success = false;
}
