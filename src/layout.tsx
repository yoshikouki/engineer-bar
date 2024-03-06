import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>エンジニアBar</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {process.env.NODE_ENV === "production" ? (
          <script type="module" src="/static/client.js" />
        ) : (
          <>
            <script type="module" src="/src/client.tsx" />
            <script type="module" src="/@vite/client" />
          </>
        )}
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};
