import type React from "react";

import type { BarEventWithSupporters } from "@/hooks/use-data";
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
        {import.meta.env.NODE_ENV === "development" ? (
          <>
            <link href="/src/index.css" rel="stylesheet" />
            <script type="module" src="/@vite/client" />
          </>
        ) : (
          <>
            <link href="/static/assets/client.css" rel="stylesheet" />
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
