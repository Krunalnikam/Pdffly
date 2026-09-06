import * as fs from "node:fs";
import * as path from "node:path";

async function postbuild() {
  const distDir = path.resolve("dist");
  const publicDir = path.join(distDir, "public");
  const clientDir = path.join(distDir, "client");

  // 1. Ensure publicDir exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 2. Generate index.html if not present
  const indexPath = path.join(publicDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    try {
      const serverEntryPath = path.join(distDir, "server", "index.mjs");
      if (fs.existsSync(serverEntryPath)) {
        await import(serverEntryPath);
        // Wait briefly for server listener to be ready
        await new Promise((res) => setTimeout(res, 800));
        const res = await fetch("http://127.0.0.1:3000/");
        if (res.ok) {
          const html = await res.text();
          fs.writeFileSync(indexPath, html, "utf-8");
          console.log("[postbuild] Pre-rendered dist/public/index.html");
        }
      }
    } catch (err) {
      console.warn("[postbuild] Note: Pre-rendering index.html skipped:", err.message);
    }
  }

  // 3. Ensure _redirects exists for SPA routing fallback on Netlify
  const redirectsPath = path.join(publicDir, "_redirects");
  const redirectsContent = "/*    /index.html   200\n";
  fs.writeFileSync(redirectsPath, redirectsContent, "utf-8");

  // 4. Ensure _headers exists for immutable assets caching
  const headersPath = path.join(publicDir, "_headers");
  const headersContent = "/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n";
  fs.writeFileSync(headersPath, headersContent, "utf-8");

  // 5. Mirror dist/public to dist/client for 100% self-contained Netlify dashboard compatibility
  try {
    fs.cpSync(publicDir, clientDir, { recursive: true, force: true });
    console.log("[postbuild] Synced dist/public -> dist/client for Netlify compatibility");
  } catch (err) {
    console.warn("[postbuild] Could not mirror to dist/client:", err);
  }

  console.log("[postbuild] Completed successfully. Ready for Netlify deployment!");
  process.exit(0);
}

postbuild().catch((err) => {
  console.error("[postbuild] Error:", err);
  process.exit(0); // non-fatal to avoid breaking standard builds
});
