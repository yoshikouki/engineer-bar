import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import type { Server, ServerWebSocket } from "bun";
import { data } from "./data";
import { App } from "./features/app";
import { Lobby } from "./features/lobby";
import {
  type Message,
  NewMessage,
  type TopicsSuggestion,
} from "./features/lobby/schema";
import {
  generateAccessToken,
  getAccessToken,
} from "./features/user/access-token";
import { env } from "./lib/env";

const app = new Hono();

app.use(secureHeaders());
app.use(logger());

app.get("/static/*", serveStatic({ root: "./public" }));
app.get("/favicon.*", serveStatic({ root: "public", path: "favicon.svg" }));
app.get(
  "*",
  reactRenderer(({ children }) => children, {
    stream: true,
    readableStreamOptions: {
      ...(env.DEV
        ? {
            bootstrapModules: ["/src/client.tsx"],
          }
        : {
            bootstrapScripts: ["/static/client.js"],
          }),
    },
  }),
);

const routes = app
  .get("/", async (c) => {
    return c.render(<App />);
  })
  .get("/lobbies/:eventId", async (c) => {
    const accessToken = await getAccessToken(c);
    if (!accessToken) {
      await generateAccessToken(c, crypto.randomUUID());
    }
    const eventId = Number.parseInt(c.req.param("eventId"), 10);
    return c.render(<Lobby eventId={eventId} />);
  })
  .get("/api/user", async (c) => {
    const accessToken = await getAccessToken(c);
    if (accessToken) {
      return c.json({
        id: accessToken.sub,
      });
    }
    const userId = crypto.randomUUID();
    await generateAccessToken(c, userId);
    return c.json({
      id: userId,
    });
  })
  .get("/ws", async (c, next) => {
    const accessToken = await getAccessToken(c);
    if (!accessToken) {
      return await next();
    }
    const server = c.env as unknown as Server;
    const isUpdated = server.upgrade(c.req.raw, {
      data: {
        eventId: c.req.query("eventId"),
        userId: accessToken.sub,
      },
    });
    if (!isUpdated) {
      return await next();
    }
    return new Response(null);
  });

const port = env.PORT || "8888";
console.log(`Listening on http://localhost:${port}`);

export type AppType = typeof routes;

const getRobbyKey = (eventId?: string | number): RobbyKey => {
  return eventId ? `robby:${eventId}` : "robby";
};
type RobbyKey = string;
const messages: Map<RobbyKey, Message[]> = new Map();
const topicsSuggestion: Map<RobbyKey, TopicsSuggestion> = new Map();

type WebSocketData = {
  eventId?: number;
  userId: string;
};

const server = Bun.serve({
  port,
  fetch: app.fetch,
  websocket: {
    open: (ws: ServerWebSocket<WebSocketData>) => {
      const robbyKey = getRobbyKey(ws.data.eventId);
      ws.subscribe(robbyKey);
      console.log(
        `[${new Date().toISOString()}] userId:${
          ws.data.userId
        } joined ${robbyKey}`,
      );
      const storedMessages = messages.get(robbyKey);
      if (storedMessages && storedMessages.length > 0) {
        ws.send(JSON.stringify(storedMessages));
      }
      if (topicsSuggestion.get(robbyKey)) {
        ws.send(JSON.stringify(topicsSuggestion.get(robbyKey)));
      }
    },
    message: (
      ws: ServerWebSocket<WebSocketData>,
      message: string | ArrayBuffer | Uint8Array,
    ) => {
      const incomingMessage = NewMessage.safeParse(
        JSON.parse(message.toString()),
      );
      if (!incomingMessage.success) {
        console.error(incomingMessage.error);
        return;
      }

      // Publish message
      const newMessage: Message = {
        ...incomingMessage.data,
        id: crypto.randomUUID(),
        type: "message",
        eventId: ws.data.eventId ?? 0,
      };
      const robbyKey = getRobbyKey(ws.data.eventId);
      server.publish(robbyKey, JSON.stringify(newMessage));
      messages.set(robbyKey, [...(messages.get(robbyKey) ?? []), newMessage]);

      // Topic suggestion
      const randomIndex = Math.round((data.topics.length - 1) * Math.random());
      const topics: TopicsSuggestion = {
        id: crypto.randomUUID(),
        type: "topicSuggestion",
        eventId: ws.data.eventId ?? 0,
        topics: data.topics.slice(
          randomIndex,
          Math.min(randomIndex + 2, data.topics.length - 1),
        ),
      };
      server.publish(robbyKey, JSON.stringify(topics));
      topicsSuggestion.set(robbyKey, topics);
    },
    close: (ws: ServerWebSocket<WebSocketData>) => {
      const robbyKey = getRobbyKey(ws.data.eventId);
      ws.unsubscribe(robbyKey);
      console.log(
        `[${new Date().toISOString()}] userId:${
          ws.data.userId
        } left ${robbyKey}`,
      );
    },
  },
});
