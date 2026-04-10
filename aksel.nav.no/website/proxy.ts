import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client.server";

const ignoredPaths = ["/eksempler", "/templates", "/ikoner", "/admin"];
const ignoredStaticPaths = [
  "/",
  "/komponenter",
  "/god-praksis",
  "/grunnleggende",
  "/produktbloggen",
];

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
    url.pathname = url.pathname + "/index.html";
    return NextResponse.redirect(url);
  }

  try {
    /**
     * TODO: Look into updating this using tag-based revalidation
     */
    const redirect = await sanityClient.fetch(
      `
  *[_type == 'redirect' && source == $source][0] {
    _id,
    destination,
    redirects
  }
`,
      { source: decodeURIComponent(req.nextUrl.pathname) },
      { cache: "force-cache", next: { revalidate: 3600 } },
    );

    if (redirect) {
      /**
       * TODO: Temp disabled due to revalidation issues causing excessive re-validations
       */
      /* const token = process.env.SANITY_WRITE;
      if (token) {
        noCdnClient(token)
          .patch(redirect._id)
          .set({ redirects: 1 + (redirect.redirects ?? 0) })
          .commit();
      } */

      if (redirect.destination.startsWith("http")) {
        return NextResponse.redirect(new URL(redirect.destination));
      }
      return NextResponse.redirect(new URL(redirect.destination, req.url));
    }

    /* Check if the request is for a markdown version (.md extension) */
    if (pathname.endsWith(".md")) {
      /* Rewrite to the markdown API route with the original path as a parameter */
      url.pathname = "/api/markdown";

      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  } catch {
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
