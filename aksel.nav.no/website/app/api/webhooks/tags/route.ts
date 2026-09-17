import { parseTags } from "next-sanity/live";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { z } from "zod";

const payloadSchema = z.object({ syncTags: z.array(z.string()).nonempty() });

function isAuthorized(req: NextRequest, secret: string): boolean {
  const provided = req.headers.get("authorization")?.replace(/^Bearer /, "");

  if (!provided) {
    return false;
  }

  const a = Buffer.from(provided);
  const b = Buffer.from(secret);

  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Called by the `invalidate-tags` Sanity Function whenever Content Lake
 * invalidates sync tags. Sanity sends raw `s1:*` tags, while `sanityFetch`
 * tags its cache entries with the `sanity:` prefix that `parseTags` enforces.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("Missing environment variable SANITY_REVALIDATE_SECRET");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  if (!isAuthorized(req, secret)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = payloadSchema.safeParse(await req.json().catch(() => null));

  if (!body.success) {
    return new NextResponse("Expected a non-empty `syncTags` array", {
      status: 400,
    });
  }

  let tags: string[];
  try {
    ({ tags } = parseTags(
      body.data.syncTags.map((tag) =>
        tag.startsWith("sanity:") ? tag : `sanity:${tag}`,
      ),
    ));
  } catch (error) {
    console.error("Received invalid sync tags", error);
    return new NextResponse("Invalid sync tags", { status: 400 });
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  console.info(
    JSON.stringify({
      event: "sanity-revalidate-tags",
      count: tags.length,
      tags,
    }),
  );

  return NextResponse.json({ revalidated: true, count: tags.length });
}
