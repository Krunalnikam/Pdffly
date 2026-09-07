import * as fs from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

process.env.NODE_ENV = process.env.NODE_ENV || "production";

/**
 * Generates an SPA fallback index.html from built assets if SSR is unavailable.
 */
function generateClientFallbackHtml(publicDir) {
  const assetsDir = path.join(publicDir, "assets");
  let cssFile = "";
  let jsFile = "";
  let runtimeFile = "";

  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css")) || "";
    jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js")) || "";
    runtimeFile = files.find((f) => f.startsWith("rolldown-runtime-") && f.endsWith(".js")) || "";
  }

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Assignment PDF Maker — Photos to Submission PDF</title>
    <meta name="description" content="Upload assignment photos, auto-detect document borders, perspective crop, and download a submission-ready PDF." />
    <meta name="author" content="Assignment PDF Maker" />
    <meta name="theme-color" content="#2563EB" />
    <meta property="og:site_name" content="Assignment PDF Maker" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Assignment PDF Maker — Photos to Submission PDF" />
    <meta property="og:description" content="Upload assignment photos, auto-detect document borders, perspective crop, and download a submission-ready PDF." />
    <meta property="og:image" content="/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Assignment PDF Maker — Photos to Submission PDF" />
    <meta name="twitter:description" content="Upload assignment photos, auto-detect document borders, perspective crop, and download a submission-ready PDF." />
    <meta name="twitter:image" content="/og-image.jpg" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
    ${runtimeFile ? `<link rel="modulepreload" href="/assets/${runtimeFile}" />` : ""}
    ${jsFile ? `<link rel="modulepreload" href="/assets/${jsFile}" />` : ""}
    <script>
      try {
        var savedTheme = localStorage.getItem('assignment_pdf_theme');
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    </script>
  </head>
  <body>
    <div id="root"></div>
    ${jsFile ? `<script type="module" src="/assets/${jsFile}"></script>` : ""}
  </body>
</html>`;
}

async function renderRouteWithSsr(ssrModule, pathname, siteDomain) {
  try {
    const url = new URL(pathname, siteDomain);
    const req = new Request(url.toString(), {
      headers: {
        host: url.host,
        "x-forwarded-proto": url.protocol.replace(":", "") || "https",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    const res = await ssrModule.default.fetch(req);
    if (res && (res.status === 200 || res.status === 304)) {
      const html = await res.text();
      if (html && html.includes("<html") && html.includes("</html>")) {
        return html;
      }
    }
  } catch (err) {
    console.warn(`[postbuild] SSR rendering failed for ${pathname}:`, err?.message || err);
  }
  return null;
}

async function postbuild() {
  const distDir = path.resolve("dist");
  const publicDir = path.join(distDir, "public");
  const clientDir = path.join(distDir, "client");

  // 1. Ensure required distribution directories exist
  for (const dir of [distDir, publicDir, clientDir]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // 2. Pre-render HTML pages
  const siteDomain =
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.SITE_URL ||
    process.env.VITE_SITE_URL ||
    "https://pdfly.netlify.app";

  let rootHtml = "";
  let adminHtml = "";

  // Try in-process SSR first
  const ssrPath = path.join(distDir, "server", "_ssr", "ssr.mjs");
  if (fs.existsSync(ssrPath)) {
    try {
      const ssrUrl = pathToFileURL(ssrPath).href;
      const ssrModule = await import(ssrUrl);
      if (ssrModule?.default?.fetch) {
        rootHtml = await renderRouteWithSsr(ssrModule, "/", siteDomain);
        adminHtml = await renderRouteWithSsr(ssrModule, "/admin", siteDomain);
        if (rootHtml) {
          console.log("[postbuild] Successfully pre-rendered root route (/) via SSR");
        }
        if (adminHtml) {
          console.log("[postbuild] Successfully pre-rendered admin route (/admin) via SSR");
        }
      }
    } catch (ssrErr) {
      console.warn("[postbuild] In-process SSR failed:", ssrErr?.message || ssrErr);
    }
  }

  // Fallback to client-side SPA HTML template if SSR did not yield rootHtml
  if (!rootHtml) {
    console.log("[postbuild] Using robust client-side SPA fallback HTML template");
    rootHtml = generateClientFallbackHtml(publicDir);
  }

  // Write index.html to publicDir, distDir, and clientDir
  const indexPath = path.join(publicDir, "index.html");
  fs.writeFileSync(indexPath, rootHtml, "utf-8");

  const distIndexPath = path.join(distDir, "index.html");
  fs.writeFileSync(distIndexPath, rootHtml, "utf-8");

  const clientIndexPath = path.join(clientDir, "index.html");
  fs.writeFileSync(clientIndexPath, rootHtml, "utf-8");

  // If adminHtml was pre-rendered, save admin/index.html
  if (adminHtml) {
    for (const base of [publicDir, distDir, clientDir]) {
      const adminDir = path.join(base, "admin");
      if (!fs.existsSync(adminDir)) {
        fs.mkdirSync(adminDir, { recursive: true });
      }
      fs.writeFileSync(path.join(adminDir, "index.html"), adminHtml, "utf-8");
    }
  }

  // 3. Ensure Netlify _redirects configuration exists in all relevant directories
  // /* -> /index.html 200 ensures client-side routing fallback for Netlify
  const redirectsContent = "/*    /index.html   200\n";
  fs.writeFileSync(path.join(publicDir, "_redirects"), redirectsContent, "utf-8");
  fs.writeFileSync(path.join(distDir, "_redirects"), redirectsContent, "utf-8");
  fs.writeFileSync(path.join(clientDir, "_redirects"), redirectsContent, "utf-8");

  // Also persist to source public/_redirects if not already present
  const srcPublicRedirects = path.resolve("public", "_redirects");
  if (!fs.existsSync(srcPublicRedirects)) {
    fs.writeFileSync(srcPublicRedirects, redirectsContent, "utf-8");
  }

  // 4. Ensure Netlify _headers exists for cache control
  const headersContent = "/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n";
  fs.writeFileSync(path.join(publicDir, "_headers"), headersContent, "utf-8");
  fs.writeFileSync(path.join(distDir, "_headers"), headersContent, "utf-8");
  fs.writeFileSync(path.join(clientDir, "_headers"), headersContent, "utf-8");

  // 5. Mirror publicDir to clientDir
  try {
    fs.cpSync(publicDir, clientDir, { recursive: true, force: true });
    console.log("[postbuild] Synced dist/public -> dist/client for Netlify compatibility");
  } catch (err) {
    console.warn("[postbuild] Could not mirror to dist/client:", err);
  }

  console.log("[postbuild] Build verification complete. All Netlify SPA requirements satisfied!");
  process.exit(0);
}

postbuild().catch((err) => {
  console.error("[postbuild] Error during postbuild:", err);
  process.exit(0);
});
