import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

import { Layout } from "./components/layout";
import { App } from "./features/app";
import { Lobby } from "./features/lobby";
import { createBunWebSocket } from "./websocket";

const app = new Hono();

const { upgradeWebSocket, websocket } = createBunWebSocket();

app.use(logger());

app.get("/static/*", serveStatic({ root: "./public" }));
app.get("/favicon.*", serveStatic({ root: "public", path: "favicon.svg" }));
app.get(
  "*",
  reactRenderer(Layout, {
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
  .get("/lobby/:eventId", async (c) => {
    const eventId = parseInt(c.req.param("eventId"), 10);
    return c.render(<Lobby eventId={eventId} />);
  })
  .get(
    "/ws",
    upgradeWebSocket((c) => {
      let intervalId: number;
      return {
        onOpen(evt, ws) {
          intervalId = setInterval(() => {
            ws.send(new Date().toString());
          }, 200) as unknown as number;
        },
        onClose() {
          clearInterval(intervalId);
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
