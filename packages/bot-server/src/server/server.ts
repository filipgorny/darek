import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Bot } from "bot";
import { UserBase, DatabaseUserBase } from "./userbase";
import { Session } from "./session";
import { User } from "./user";

export type ServerType = "http";

export interface BotServer {
  listen(port?: number): void;
}

interface SessionRequest extends Request {
  session: Session;
}

export class HttpServer implements BotServer {
  constructor(
    private bot: Bot,
    private userBase: UserBase,
    private app: Express
  ) {}

  listen(port = 8055) {
    dotenv.config();

    this.app.use(async (req: SessionRequest, res, next) => {
      const sessionToken = req.get("Authorization");

      if (!sessionToken) {
        console.log("No token");
        return;
      }

      let token = sessionToken.replace("Bearer", "").replace(" ", "").trim();

      this.userBase.findUserByToken(token).then((user: User) => {
        if (user) {
          req.session = new Session(user, this.bot.begin());
        }

        console.log("user", user);

        next();
      });
    });

    this.app.post("/chat", (req: SessionRequest, res: Response) => {
      if (!req.session) {
        res.status(401);

        res.send({
          error: "Unathorised",
        });

        return;
      }

      const input = req.body.input || "hi";

      const response = req.session.conversation.react(input);

      res.send({
        success: response.success,
        time: new Date().toLocaleString(),
        input: input,
        output: response.text,
      });
    });

    this.app.listen(port);

    console.log(`🤹 𝙎𝙚𝙧𝙫𝙚𝙧 𝙧𝙚𝙖𝙙𝙮!`);
  }
}

export const server = (
  bot: Bot,
  userbase: UserBase,
  type: ServerType
): BotServer => {
  if (type == "http") {
    const app: Express = express();
    app.use(express.json());

    const server = new HttpServer(bot, userbase, app);

    return server;
  }
};
