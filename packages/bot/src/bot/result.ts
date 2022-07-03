export class Result {
  success = true;

  constructor(public text?: string) {}
}

export class NoResult extends Result {
  success = false;
}

export class DontUnderstand extends Result {
  success = true;

  variants = [
    "I don't understand.",
    "Can you rephrase please?",
    "Nothing in my database about that.",
    "I don't think I can help with that.",
    "Would you mind being more specific?",
    "Try something that I would be abble to work with.",
    "I don't recognize this, sorry.",
    "Oh pants, I don't know how to help...",
  ];

  constructor() {
    super();

    this.text = this.variants[Math.floor(Math.random() * this.variants.length)];
  }
}
