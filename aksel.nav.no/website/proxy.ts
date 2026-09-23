import { createClient, defineQuery } from "next-sanity";
import type { NextRequest } from "next/server";
import { NextResponse, after } from "next/server";
import type { Redirect } from "@/app/_sanity/query-types";
import { SANITY_BASE_CONFIG } from "@/sanity/config";

const ignoredPaths = ["/eksempler", "/templates", "/ikoner", "/admin"];
const ignoredStaticPaths = [
  "/",
  "/komponenter",
  "/god-praksis",
  "/grunnleggende",
  "/produktbloggen",
];

const client = createClient({
  ...SANITY_BASE_CONFIG,
  token: process.env.SANITY_READ_NO_DRAFTS,
  ignoreBrowserTokenWarning: process.env.NODE_ENV === "test",
  useCdn: true,
});

const REDIRECTS_QUERY = defineQuery(`
  *[_type == 'redirect' && defined(source) && defined(destination)] {
    _id,
    source,
    destination
  }
`);

const REDIRECT_CACHE_TTL_MS = 60 * 60 * 1000;

type RedirectEntry = Required<Pick<Redirect, "_id" | "source" | "destination">>;

let redirectCache: Map<string, RedirectEntry> | null = null;
let redirectCacheExpiresAt = 0;
let redirectCacheRefresh: Promise<Map<string, RedirectEntry>> | null = null;

function refreshRedirects() {
  redirectCacheRefresh ??= client
    .fetch<RedirectEntry[]>(
      REDIRECTS_QUERY,
      {},
      { perspective: "published", useCdn: true },
    )
    .then((redirects) => {
      redirectCache = new Map(
        redirects.map((redirect) => [redirect.source, redirect]),
      );
      redirectCacheExpiresAt = Date.now() + REDIRECT_CACHE_TTL_MS;
      return redirectCache;
    })
    .finally(() => {
      redirectCacheRefresh = null;
      console.info("[proxy] Finished refreshing redirects");
    });

  return redirectCacheRefresh;
}

/**
 * Redirects are read on nearly every request, so we keep the full set in memory
 * and serve stale entries while refreshing in the background.
 */
async function getRedirect(source: string) {
  if (!redirectCache) {
    return (await refreshRedirects()).get(source);
  }

  if (Date.now() > redirectCacheExpiresAt) {
    after(async () =>
      refreshRedirects().catch((error) => {
        console.error("[proxy] Failed to refresh redirects:", error.message);
      }),
    );
  }

  return redirectCache.get(source);
}

/**
 * Destinations come from Sanity, so treat them as untrusted input. Ensure
 * relative values stay on our origin, since "//example.com" resolves off-origin.
 */
function resolveDestination(destination: string, origin: string) {
  if (destination.startsWith("http://") || destination.startsWith("https://")) {
    return new URL(destination);
  }

  const url = new URL(destination, origin);

  return url.origin === origin ? url : null;
}

export async function proxy(req: NextRequest) {
  /*
   * "Open in studio" links defaults to published perspective, but unpublished drafts have no
   * published content, leading to 404-erros in presentation-mode. By stripping the query,
   * we default to draft-mode, which is the expected behaviour when coming from the studio.
   */
  if (req.nextUrl.pathname.startsWith("/admin/intent/edit")) {
    const editUrl = req.nextUrl.clone();
    if (editUrl.searchParams.get("perspective") === "published") {
      editUrl.searchParams.delete("perspective");

      return NextResponse.redirect(editUrl);
    }
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;

  const url = req.nextUrl.clone();

  if (
    ignoredPaths.some((prefix) => req.nextUrl.pathname.startsWith(prefix)) ||
    ignoredStaticPaths.some((prefix) => req.nextUrl.pathname === prefix)
  ) {
    return NextResponse.next();
  }

  if (
    url.pathname.startsWith("/sandbox") &&
    !url.pathname.includes("index.html") &&
    !url.pathname.match(/(\..*)$/)
  ) {
    url.pathname = `${url.pathname}/index.html`;
    return NextResponse.redirect(url);
  }

  try {
    const lookup = decodeURIComponent(pathname);
    const redirect = await getRedirect(lookup);

    if (redirect) {
      const destination = resolveDestination(
        redirect.destination,
        req.nextUrl.origin,
      );

      if (!destination) {
        console.error("[proxy] Rejected off-origin redirect destination", {
          _id: redirect._id,
        });
        return NextResponse.next();
      }

      const token = process.env.SANITY_WRITE;
      if (token) {
        after(async () => {
          try {
            await client
              .patch(redirect._id)
              .setIfMissing({ redirects: 0 })
              .inc({ redirects: 1 })
              .commit({ token });
          } catch (error) {
            console.error(
              "[proxy] Failed to commit redirect count update:",
              error,
            );
          }
        });
      }

      return NextResponse.redirect(destination);
    }

    /* Check if the request is for a markdown version (.md extension) */
    if (pathname.endsWith(".md")) {
      /* Rewrite to the markdown API route with the original path as a parameter */
      url.pathname = "/api/markdown";

      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[proxy] redirect handling failed:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (fallbackfavicon file)
     * - favicon.svg (favicon file)
     * - robots.txt
     */
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|robots.txt).*)",
  ],
};
