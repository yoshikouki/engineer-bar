import React from "react";

import "../index.css";
import { Header } from "./header";
import { ThemeProvider } from "./theme-provider";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>エンジニアBar</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {process.env.NODE_ENV === "production" ? (
          <>
            <link href="/static/assets/client.css" rel="stylesheet" />
            <script type="module" src="/static/client.js" />
          </>
        ) : (
          <>
            <link href="/src/index.css" rel="stylesheet" />
            <script type="module" src="/@vite/client" />
          </>
        )}
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          <div className="flex flex-col items-center">
            <Header />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};
