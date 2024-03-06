import { hydrateRoot } from "react-dom/client";
import "vite/modulepreload-polyfill";

import { App } from "./features/app";
import { Layout } from "./layout";

hydrateRoot(
  document,
  <Layout>
    <App />
  </Layout>
);
