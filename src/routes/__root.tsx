import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { ThemeProvider } from "../lib/theme";
import { LanguageProvider } from "../lib/i18n";
import { trackWebsiteVisit } from "../lib/analytics";
import { getSiteUrl } from "../lib/site-url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const siteUrl = getSiteUrl();
    const ogJpg = `${siteUrl}/og-image.jpg`;
    const ogPng = `${siteUrl}/og-image.png`;
    const pageUrl = `${siteUrl}/`;

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Assignment PDF Maker — Photos to Submission PDF" },
        {
          name: "description",
          content:
            "Upload assignment photos, auto-detect document borders, perspective crop, and download a submission-ready PDF.",
        },
        { name: "author", content: "Assignment PDF Maker" },
        { name: "theme-color", content: "#2563EB" },
        // Open Graph Meta Tags (WhatsApp, Facebook, LinkedIn, Discord)
        { property: "og:site_name", content: "Assignment PDF Maker" },
        { property: "og:title", content: "Assignment PDF Maker — Photos to Submission PDF" },
        {
          property: "og:description",
          content:
            "Upload assignment photos, auto-detect document borders, perspective crop, and download a submission-ready PDF.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
        // Primary Open Graph Image (High-speed, optimized JPEG under 300KB for WhatsApp)
        { property: "og:image", content: ogJpg },
        { property: "og:image:secure_url", content: ogJpg },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "800" },
        {
          property: "og:image:alt",
          content: "Assignment PDF Maker — Smart Document Scanner & Submission Generator",
        },
        // Secondary Open Graph Image (Crisp PNG format)
        { property: "og:image", content: ogPng },
        { property: "og:image:secure_url", content: ogPng },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "800" },
        // Twitter Card Meta Tags
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Assignment PDF Maker — Photos to Submission PDF" },
        {
          name: "twitter:description",
          content:
            "Upload assignment photos, auto-detect document borders, perspective crop, and download a submission-ready PDF.",
        },
        { name: "twitter:image", content: ogJpg },
        {
          name: "twitter:image:alt",
          content: "Assignment PDF Maker — Smart Document Scanner & Submission Generator",
        },
        { name: "twitter:url", content: pageUrl },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "canonical", href: pageUrl },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "icon", href: "/favicon.png", type: "image/png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('assignment_pdf_theme');
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    trackWebsiteVisit();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
