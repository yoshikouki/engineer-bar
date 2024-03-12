import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { Server, ServerWebSocket } from "bun";
import { App } from "./features/app";
import { Lobby } from "./features/lobby";

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
      ...(process.env.NODE_ENV === "production"
        ? {
            bootstrapScripts: ["/static/client.js"],
          }
        : {
            bootstrapModules: ["/src/client.tsx"],
          }),
    },
  })
);

const routes = app
  .get("/", async (c) => {
    return c.render(<App />);
  })
  .get("/lobbies/:eventId", async (c) => {
    const eventId = parseInt(c.req.param("eventId"), 10);
    return c.render(<Lobby eventId={eventId} />);
  })
  .get("/ws", async (c, next) => {
    const server = c.env as unknown as Server;
    const upgradeResult = server.upgrade(c.req.raw, {
      data: {},
    });
    if (upgradeResult) {
      return new Response(null);
    }
    await next(); // Failed
  });

const port = process.env.PORT || "8888";
console.log(`Listening on http://localhost:${port}`);

export type AppType = typeof routes;

type WebSocketData = Record<string, never>;

const server = Bun.serve({
  port,
  fetch: app.fetch,
  websocket: {
    open: (ws: ServerWebSocket<WebSocketData>) => {
      console.log("ws.data:", ws.data);
      ws.subscribe("robby");
      console.log("WebSocket is connected.");
    },
    message: (
      ws: ServerWebSocket<WebSocketData>,
      message: string | ArrayBuffer | Uint8Array
    ) => {
      server.publish(
        "robby",
        JSON.stringify({
          id: crypto.randomUUID(),
          content: message,
          user: { id: "server" },
        })
      );
    },
    close: (ws: ServerWebSocket<WebSocketData>) => {
      ws.unsubscribe("robby");
      console.log("WebSocket is closed.");
    },
  },
});
