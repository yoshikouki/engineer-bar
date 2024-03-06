import * as React from "react";
import { createRoot } from "react-dom/client";
import "vite/modulepreload-polyfill";
import { App } from "./features/app";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No root element found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
