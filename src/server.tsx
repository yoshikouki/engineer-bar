import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

import { Layout } from "./layout";

const app = new Hono();

app.use(logger());

app.get("/static/*", serveStatic({ root: "./public" }));
app.get("/favicon.*", serveStatic({ root: "public", path: "favicon.svg" }));
app.get("*",reactRenderer(Layout));

app.get("/", async (c) => {
  return c.render(<div id="root" />);
});

const port = process.env.PORT || "8888"
console.log(`Listening on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
