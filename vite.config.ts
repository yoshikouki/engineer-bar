import type http from "http";
import { minimatch } from "minimatch";
import {
  type Connect,
  type Plugin,
  type ViteDevServer,
  defineConfig,
} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: "./src/client.tsx",
          output: {
            entryFileNames: "static/client.js",
            chunkFileNames: "static/assets/[name]-[hash].js",
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
        minify: true,
        emptyOutDir: false,
        copyPublicDir: false,
        sourcemap: true,
      },
      plugins: [tsconfigPaths()],
    };
  }
  return {
    build: { manifest: true },
    server: {
      origin: "http://localhost:8888",
      proxy: {
        "^/$": {
          target: "http://localhost:8888",
        },
        "^/lobbies/": {
          target: "http://localhost:8888",
        },
        "^/api/": {
          target: "http://localhost:8888",
        },
        "/ws": {
          target: "ws://localhost:8888",
          ws: true,
        },
      },
      watch: {
        ignored: [],
      },
    },
    plugins: [tsconfigPaths(), devServer()],
  };
});

function devServer(): Plugin {
  const plugin: Plugin = {
    name: "@hono/vite-dev-server",
    configureServer: async (server: ViteDevServer) => {
      server.middlewares.use(
        async (
          req: http.IncomingMessage,
          res: http.ServerResponse,
          next: Connect.NextFunction,
        ) => {
          const exclude = [
            /.*\.ts$/,
            /.*\.tsx$/,
            /^\/client.tsx$/,
            /^\/@.+$/,
            /^\/favicon\.ico$/,
            /^\/static\/.+/,
            /^\/node_modules\/.*/,
          ];

          for (const pattern of exclude) {
            if (!req.url) continue;
            if (pattern instanceof RegExp) {
              if (!pattern.test(req.url)) continue;
              return next();
            }
            if (minimatch(req.url?.toString(), pattern)) {
              return next();
            }
          }

          next();
        },
      );
    },
  };
  return plugin;
}
