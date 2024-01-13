import { noCdnClient, sanityClient } from "@/sanity/client.server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ignoredPaths = ["/eksempler", "/templates", "/ikoner", "/admin"];
const ignoredStaticPaths = [
  "/",
  "/komponenter",
  "/god-praksis",
  "/grunnleggende",
  "/produktbloggen",
];

export async function middleware(req: NextRequest) {
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
    const redirect = await sanityClient.fetch(
      `
  *[_type == 'redirect' && source == $source][0] {
    _id,
    destination,
    redirects
  }
`,
      { source: decodeURIComponent(req.nextUrl.pathname) },
    );

    if (redirect) {
      const token = process.env.SANITY_WRITE_KEY;
      if (token) {
        noCdnClient(token)
          .patch(redirect._id)
          .set({ redirects: 1 + (redirect.redirects ?? 0) })
          .commit();
      }

      if (redirect.destination.startsWith("http")) {
        return NextResponse.redirect(new URL(redirect.destination));
      }
      return NextResponse.redirect(new URL(redirect.destination, req.url));
    }

    return NextResponse.next();
  } catch (e) {
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
     * - searchindex.json
     * - robots.txt
     */
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|searchindex.json|robots.txt).*)",
  ],
};
