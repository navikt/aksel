import { getClient } from "@/sanity-client";
import { NextResponse } from "next/server";

export async function middleware(req) {
  try {
    const redirects = await getClient().fetch(`
  *[_type == 'redirect'] {
    destination,
    source,
    permanent
  }
`);

    const redirect = redirects.find(
      (redirect) =>
        decodeURIComponent(req.nextUrl.pathname) === redirect?.source
    );

    if (redirect) {
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
