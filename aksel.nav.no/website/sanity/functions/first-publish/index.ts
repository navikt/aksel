import { createClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";
import { SANITY_API_VERSION } from "@/sanity/config";

const handler = documentEventHandler(async ({ context, event }) => {
  const client = createClient({
    ...context.clientOptions,
    apiVersion: SANITY_API_VERSION,
    useCdn: false,
  });
  const { data } = event;
  const { local } = context; // local is true when running locally

  try {
    const publishedAt = new Date().toISOString();
    await client
      .patch(data._id)
      .setIfMissing({
        publishedAt,
      })
      .commit({ dryRun: local });
    console.info(
      local
        ? `(LOCAL TEST MODE - Content Lake not updated) Set publishedAt timestamp for document (${data._id}): ${publishedAt}  `
        : `Set publishedAt timestamp for document (${data._id}): ${publishedAt}`,
    );
  } catch (error) {
    console.error("Error setting publishedAt timestamp:", error);
  }
});

export { handler };
