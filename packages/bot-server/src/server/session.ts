import { Conversation } from "bot";
import { User } from "./user";

export class Session {
  constructor(public user: User, public conversation: Conversation) {}
}
