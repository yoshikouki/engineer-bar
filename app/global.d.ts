import {} from "hono";

type Head = {
  title?: string;
};

declare module "hono" {
  interface Env {
    Variables: Record<string, never>;
    Bindings: Record<string, never>;
  }
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      head?: Head,
    ): Response | Promise<Response>;
  }
}

declare module "@hono/react-renderer" {
  interface Props {
    title: string;
  }
}
