import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Bot } from "../bot/bot";
import { Session } from "./session";

export type ServerType = "http";

export interface BotServer {
  listen(): void;
}

interface SessionRequest extends Request {
  token: string;
}

export class HttpServer implements BotServer {
  sessions: Session[] = [];

  constructor(private bot: Bot, private app: Express, private port: number) {}

  listen() {
    this.app.use((req: SessionRequest, res, next) => {
      const sessionToken = req.get("Session-token");

      req.token = sessionToken;

      next();
    });

    this.app.post("/hi", (req: Request, res: Response) => {
      const conversation = this.bot.chat();
      const session = new Session(conversation);

      this.sessions.push(session);

      res.send({
        token: session.token,
      });
    });

    this.app.post("/chat", (req: SessionRequest, res: Response) => {
      const session = this.sessions.find((session) =>
        session.compareToken(req.token)
      );

      if (!session) {
        res.status(401);

        res.send({
          error: "Unathorised",
        });

        return;
      }

      const response = session.conversation.react(req.body.line ?? "");

      res.send({
        success: response.success,
        line: response.text,
      });
    });

    this.app.listen(this.port);
  }
}

export const server = (bot: Bot, type: ServerType): BotServer => {
  if (type == "http") {
    dotenv.config();

    const app: Express = express();
    app.use(express.json());

    const port: number = +process.env.PORT || 8020;

    const server = new HttpServer(bot, app, port);

    return server;
  }
};
