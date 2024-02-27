import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { serveStatic } from "hono/bun";
import { Layout } from "./layout";

if (process.env.NODE_ENV === "development") {
  await Bun.build({
    entrypoints: ["./src/client.tsx"],
    outdir: "./public/static",
  });
}

const app = new Hono();

app.use(logger());
app.use("/static/*", serveStatic({ root: "public" }));
app.use("/favicon.svg", serveStatic({ root: "public" }));

app.get(
  "*",
  reactRenderer(Layout),
);

app.get("/", async (c) => {
  return c.render(<div id="root" />);
});

export default {
  port: process.env.PORT || "8888",
  fetch: app.fetch,
};
