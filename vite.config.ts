import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  console.log("mode", mode);
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
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
        emptyOutDir: false,
        copyPublicDir: false,
      },
    };
  }
  return {
    plugins: [
      devServer({
        entry: "src/server.tsx",
      }),
    ],
  };
});
