import { noCdnClient, sanityClient } from "@/sanity/client.server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const redirect = await sanityClient.fetch(
      `
  *[_type == 'redirect' && source == $source][0] {
    _id,
    destination,
    redirects
  }
`,
      { source: decodeURIComponent(req.nextUrl.pathname) }
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
