import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

import { Layout } from "./components/layout";
import { App } from "./features/app";

const app = new Hono();

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

app.get("/", async (c) => {
  return c.render(<App />);
});

const port = process.env.PORT || "8888";
console.log(`Listening on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
