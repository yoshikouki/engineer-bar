import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { reactRenderer } from "./react-renderer";

import type { Server, ServerWebSocket } from "bun";
import { App } from "./features/app";
import { Lobby } from "./features/lobby";
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

const getRobbyKey = (eventId?: string | number) => {
  return eventId ? `robby:${eventId}` : "robby";
};

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
    },
    message: (
      ws: ServerWebSocket<WebSocketData>,
      message: string | ArrayBuffer | Uint8Array,
    ) => {
      const data = JSON.parse(message.toString());
      const eventId = ws.data.eventId ?? 0;
      server.publish(
        getRobbyKey(ws.data.eventId),
        JSON.stringify({
          id: crypto.randomUUID(),
          eventId,
          content: data.content,
          user: data.user,
        }),
      );
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
