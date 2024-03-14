import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { getCookie, setCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { reactRenderer } from "./react-renderer";

import type { Server, ServerWebSocket } from "bun";
import { App } from "./features/app";
import { Lobby } from "./features/lobby";
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
      ...(import.meta.env.NODE_ENV === "production"
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
    const accessToken = await getCookie(c, "access_token");
    const decodedPayload =
      accessToken && (await verify(accessToken, env.ACCESS_TOKEN_SECRET));
    if (!decodedPayload) {
      const newAccessToken = await sign(
        {
          iss: "engineer-bar",
          sub: crypto.randomUUID(),
          aud: "https://engineer-bar.com",
          exp: Math.floor(Date.now() / 1000) + env.ACCESS_TOKEN_EXPIRES_IN,
          nbf: Math.floor(Date.now() / 1000),
          iat: Math.floor(Date.now() / 1000),
          jti: crypto.randomUUID(),
        },
        env.ACCESS_TOKEN_SECRET,
      );
      setCookie(c, "access_token", newAccessToken, {
        path: "/",
        httpOnly: true,
        maxAge: env.ACCESS_TOKEN_EXPIRES_IN,
        sameSite: "Strict",
        ...(env.NODE_ENV === "production" && {
          secure: true,
          domain: "engineer-bar.com",
        }),
      });
    }
    const eventId = Number.parseInt(c.req.param("eventId"), 10);
    return c.render(<Lobby eventId={eventId} />);
  })
  .get("/ws", async (c, next) => {
    const accessToken = await getCookie(c, "access_token");
    const decodedPayload =
      accessToken && (await verify(accessToken, env.ACCESS_TOKEN_SECRET));
    const server = c.env as unknown as Server;
    const isUpdated = server.upgrade(c.req.raw, {
      data: {
        userId: decodedPayload?.sub,
      },
    });
    if (!isUpdated) {
      return await next();
    }
    return new Response(null);
  });

const port = import.meta.env.PORT || "8888";
console.log(`Listening on http://localhost:${port}`);

export type AppType = typeof routes;

type WebSocketData = Record<string, never>;

const server = Bun.serve({
  port,
  fetch: app.fetch,
  websocket: {
    open: (ws: ServerWebSocket<WebSocketData>) => {
      ws.subscribe("robby");
    },
    message: (
      ws: ServerWebSocket<WebSocketData>,
      message: string | ArrayBuffer | Uint8Array,
    ) => {
      const data = JSON.parse(message.toString());
      server.publish(
        "robby",
        JSON.stringify({
          id: crypto.randomUUID(),
          content: data.content,
          user: data.user,
        }),
      );
    },
    close: (ws: ServerWebSocket<WebSocketData>) => {
      ws.unsubscribe("robby");
      console.log("WebSocket is closed.");
    },
  },
});
