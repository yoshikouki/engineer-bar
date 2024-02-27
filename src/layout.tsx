import React from "react";

const isProduction = process.env.NODE_ENV === "production" || import.meta.env.PROD;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React + Hono</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {isProduction ? (
          <script type="module" src="/static/client.js" />
        ) : (
          <script type="module" src="/src/client.tsx" />
        )}
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};
