import { reactRenderer } from "@hono/react-renderer";
import { Hono } from "hono";

const app = new Hono();

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
  })
);

app.get("/", async (c) => {
  return c.render(<h1>Hello, World!</h1>);
});

export default app;
