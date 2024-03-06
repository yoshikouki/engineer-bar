import { hydrateRoot } from "react-dom/client";
import "vite/modulepreload-polyfill";

import { Layout } from "./components/layout";
import { App } from "./features/app";

hydrateRoot(
  document,
  <Layout>
    <App />
  </Layout>,
);
