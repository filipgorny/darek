import { Conversation } from "../bot/conversation";
import { User } from "./user";

export class Session {
  constructor(public user: User, public conversation: Conversation) {}
}
