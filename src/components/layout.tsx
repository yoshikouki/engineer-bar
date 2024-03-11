import React from "react";

import { BarEventWithSupporters } from "@/hooks/use-data";
import { cn } from "@/lib/utils";
import "../index.css";
import { Footer } from "./footer";
import { Header } from "./header";
import { MainNav } from "./main-nav";
import { ThemeProvider } from "./theme-provider";

export const Layout = ({
  children,
  event,
  className,
}: {
  children: React.ReactNode;
  event?: BarEventWithSupporters;
  className?: string;
}) => {
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
          <Header event={event} />
          <MainNav />
          <main className={cn("w-full", className)}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};
