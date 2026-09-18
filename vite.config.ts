import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

function pdflyApiPlugin(): Plugin {
  return {
    name: "pdfly-api-dev-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/") && !req.url?.startsWith("/_serverFn/")) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
        const pathname = url.pathname;

        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization, Accept, x-tsr-serverFn",
        );

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          res.end("");
          return;
        }

        // Read request body
        let bodyText = "";
        for await (const chunk of req) {
          bodyText += chunk;
        }

        let body: Record<string, unknown> = {};
        if (bodyText) {
          try {
            body = JSON.parse(bodyText);
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ success: false, error: "Invalid JSON payload" }));
            return;
          }
        }

        const query: Record<string, string> = {};
        url.searchParams.forEach((val, key) => {
          query[key] = val;
        });

        try {
          const { handleApiRequest } = await import("./src/lib/api-router");
          const result = await handleApiRequest({
            method: req.method || "GET",
            pathname,
            body,
            query,
          });

          res.statusCode = result.statusCode;
          res.end(typeof result.body === "string" ? result.body : JSON.stringify(result.body));
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Internal Server Error";
          res.statusCode = 500;
          res.end(JSON.stringify({ success: false, error: msg }));
        }
      });
    },
  };
}

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
      pdflyApiPlugin(),
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
