import { Conversation } from "../bot/conversation";
import { v4 as uuid } from "uuid";
import { hash } from "./hash";

const crypt = hash("124325140129031248ur021e");

export class Session {
  public id: string;
  public token: string;

  constructor(public conversation: Conversation) {
    this.id = uuid();

    const token = {
      conversationId: conversation.id,
      sessionId: this.id,
    };

    const buffer = new Buffer(JSON.stringify(token));

    this.token = crypt.encrypt(buffer.toString("base64"));
  }

  compareToken(token: string): boolean {
    return this.token == token;
  }
}
