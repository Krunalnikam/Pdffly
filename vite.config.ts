import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => {
  if (command === "build") {
    process.env.NODE_ENV = "production";
  }

  return {
    server: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: true,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        client: { entry: "client" },
        server: { entry: "server" },
      }),
      ...(command === "build"
        ? [
            nitro({
              host: "0.0.0.0",
              output: {
                dir: "dist",
                publicDir: "dist/public",
                serverDir: "dist/server",
              },
            }),
          ]
        : []),
      viteReact(),
    ],
  };
});
