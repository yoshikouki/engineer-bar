import { reactRenderer } from "@hono/react-renderer";
import { Server } from "bun";
import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono<{
  Bindings: {
    server: Server;
  };
}>();

app.use(logger());

app.get(
  "*",
  reactRenderer(({ children }) => {
    return (
      <html lang="ja">
        <body>
          <h1>React + Hono</h1>
          <div>{children}</div>
        </body>
      </html>
    );
  }),
);

app.get("/", async (c) => {
  return c.render(<h1>Hello, World!!1</h1>);
});

export default {
  port: process.env.PORT || "8888",
  fetch: (req: Request, server: Server) => {
    return app.fetch(req, {
      server,
    });
  },
};
