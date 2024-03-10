import { hydrateRoot } from "react-dom/client";
import "vite/modulepreload-polyfill";

import { Layout } from "./components/layout";
import { App } from "./features/app";
import { Lobby } from "./features/lobby";
import { extractId } from "./lib/route";

const hydrationComponents = [
  {
    pathRegExp: /^\/lobbies\/(\d+)$/,
    onRender: () => <Lobby eventId={extractId(/^\/lobbies\/(\d+)$/)} />,
  },
  {
    pathRegExp: /^\/$/,
    onRender: () => <App />,
  },
];

const detectComponent = () => {
  for (const { pathRegExp, onRender } of hydrationComponents) {
    if (pathRegExp.test(window.location.pathname)) {
      return onRender();
    }
  }
  throw new Error("No matching component");
};

hydrateRoot(document, <Layout>{detectComponent()}</Layout>);
