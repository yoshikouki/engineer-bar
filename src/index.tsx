import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import { App } from "./features/app";
import { Lobby } from "./features/lobby";
import { WSContext, createBunWebSocket } from "./websocket";

const app = new Hono();

const { upgradeWebSocket, websocket } = createBunWebSocket();

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
  }),
);

const routes = app
  .get("/", async (c) => {
    return c.render(<App />);
  })
  .get("/lobbies/:eventId", async (c) => {
    const eventId = parseInt(c.req.param("eventId"), 10);
    return c.render(<Lobby eventId={eventId} />);
  })
  .get(
    "/ws",
    upgradeWebSocket((c) => {
      const connections: WSContext[] = [];
      return {
        onOpen(event, ws) {
          connections.push(ws);
          console.log("onOpen: connections:", connections.length);
          console.log("connected");
        },
        onMessage(event, ws) {
          console.log("onMessage: connections:", connections.length);
          for (const conn of connections) {
            if (conn !== ws) {
              conn.send(
                JSON.stringify({
                  id: crypto.randomUUID(),
                  content: event.data,
                }),
              );
            }
          }
        },
        onClose() {
          console.log("disconnected");
        },
      };
    }),
  );

const port = process.env.PORT || "8888";
console.log(`Listening on http://localhost:${port}`);

export type AppType = typeof routes;

export default {
  port,
  fetch: app.fetch,
  websocket,
};
