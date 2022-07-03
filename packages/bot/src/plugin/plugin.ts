import { Bot } from "../bot/bot";

export abstract class Plugin {
  abstract configure(bot: Bot): Promise<void>;
}
