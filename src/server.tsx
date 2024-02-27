import { reactRenderer } from "@hono/react-renderer";
import { Server } from "bun";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { serveStatic } from "hono/bun";
import { Layout } from "./layout";

const app = new Hono<{
  Bindings: {
    server: Server;
  };
}>();

app.use(logger());
app.use("/static/*", serveStatic({ root: "dist" }));
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
  fetch: (req: Request, server: Server) => {
    return app.fetch(req, {
      server,
    });
  },
};
