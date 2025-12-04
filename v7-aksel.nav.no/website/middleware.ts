import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sanityLocalFetch } from "@/app/_sanity/live";

const ignoredPaths = ["/eksempler", "/templates", "/ikoner", "/admin"];
const ignoredStaticPaths = [
  "/",
  "/komponenter",
  "/god-praksis",
  "/grunnleggende",
  "/produktbloggen",
];

export async function middleware(req: NextRequest) {
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

  if (
    ignoredPaths.some((prefix) => req.nextUrl.pathname.startsWith(prefix)) ||
    ignoredStaticPaths.some((prefix) => req.nextUrl.pathname === prefix)
  ) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  if (
    url.pathname.startsWith("/sandbox") &&
    !url.pathname.includes("index.html") &&
    !url.pathname.match(/(\..*)$/)
  ) {
    url.pathname = url.pathname + "/index.html";
    return NextResponse.redirect(url);
  }

  try {
    const { data: redirect } = await sanityLocalFetch({
      query: `
  *[_type == 'redirect' && source == $source][0] {
    _id,
    destination,
    redirects
  }
`,
      params: { source: decodeURIComponent(req.nextUrl.pathname) },
    });

    if (redirect) {
      if (redirect.destination.startsWith("http")) {
        return NextResponse.redirect(new URL(redirect.destination));
      }
      return NextResponse.redirect(new URL(redirect.destination, req.url));
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
