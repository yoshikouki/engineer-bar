import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React + Hono</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script type="module" src="/static/client.js" />
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};
