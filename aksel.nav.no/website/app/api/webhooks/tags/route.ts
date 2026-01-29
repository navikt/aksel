import type { SanityClient as SanityClientType } from "@sanity/client";
import { parseBody } from "next-sanity/webhook";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { client as SanityClient } from "@/app/_sanity/client";

const webhookPayloadSchema = z.object({ _id: z.string(), _type: z.string() });

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      console.error("Missing environment variable SANITY_REVALIDATE_SECRET");
      return new Response(
        "Missing environment variable SANITY_REVALIDATE_SECRET",
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<unknown>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      console.error("Invalid sanity webhook signature");
      return new Response(
        JSON.stringify({
          message: "Invalid signature",
          isValidSignature,
          body,
        }),
        {
          status: 401,
        },
      );
    }

    try {
      const tags = await fetchSyncTagsForDocument(SanityClient, body);
      const message = `Revalidated tags: ${tags.join(", ")} from document ${JSON.stringify(body)}`;
      console.info(message);

      return NextResponse.json({ message, body });
    } catch (err) {
      console.error(err);
      return new Response((err as Error).message, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return new Response((err as Error).message, { status: 500 });
  }
}

async function fetchSyncTagsForDocument(
  client: SanityClientType,
  body: unknown,
) {
  const { _id: id, _type: type } = webhookPayloadSchema.parse(body);

  const { syncTags = [] } = await client.fetch(
    `*[_id == $id || _type == $type][0] { _type, _id}`,
    { id, type },
    {
      filterResponse: false,
      perspective: "published",
      returnQuery: false,
      resultSourceMap: false,
      stega: false,
      useCdn: true,
    },
  );
  return syncTags;
}
