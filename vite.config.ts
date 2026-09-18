import { defineConfig, type Plugin } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

function adminApiPlugin(): Plugin {
  return {
    name: "admin-api-dev-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/admin/")) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
        const pathname = url.pathname;

        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");

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

        try {
          const { executeVerifyRecoveryCode, executeAdminPasswordReset, verifyAdminKey } =
            await import("./src/lib/admin-auth-server");

          if (pathname === "/api/admin/verify-recovery-code") {
            const result = executeVerifyRecoveryCode(String(body.recoveryCode || ""));
            res.statusCode = result.success ? 200 : 400;
            res.end(JSON.stringify(result));
            return;
          }

          if (pathname === "/api/admin/reset-password") {
            const result = await executeAdminPasswordReset(
              String(body.resetToken || ""),
              String(body.newPassword || ""),
              String(body.confirmPassword || ""),
            );
            res.statusCode = result.success ? 200 : 400;
            res.end(JSON.stringify(result));
            return;
          }

          if (pathname === "/api/admin/verify-key") {
            const authorized = await verifyAdminKey(String(body.adminKey || ""));
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, authorized }));
            return;
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ success: false, error: `API route not found: ${pathname}` }));
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
      adminApiPlugin(),
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
