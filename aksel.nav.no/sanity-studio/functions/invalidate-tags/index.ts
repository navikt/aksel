import { syncTagInvalidateEventHandler } from "@sanity/functions";

async function revalidate(
  url: string,
  secret: string,
  syncTags: string[],
): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({ syncTags }),
  });

  if (!response.ok) {
    throw new Error(
      `${url} responded with HTTP ${response.status}: ${await response.text()}`,
    );
  }
}

const handler = syncTagInvalidateEventHandler(
  async ({ context, event, done }) => {
    const { syncTags } = event.data;
    const { local } = context;

    /**
     * `sanity functions env add invalidate-tags SANITY_REVALIDATE_SECRET <value>`
     */
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    const url = process.env.REVALIDATE_URL;

    try {
      if (!secret) {
        console.error("Missing environment variable SANITY_REVALIDATE_SECRET");
      } else if (!url) {
        console.error("Missing environment variable REVALIDATE_URL");
      } else if (local) {
        console.info(
          `(LOCAL TEST MODE - no request sent) Would revalidate ${syncTags.length} sync tags on ${url}`,
        );
      } else {
        await revalidate(url, secret, syncTags);
        console.info(
          `Revalidated ${syncTags.length} sync tags: ${syncTags.join(", ")}`,
        );
      }
    } catch (error) {
      console.error("Failed to revalidate sync tags:", error);
    } finally {
      /*
       * Until `done` runs, Sanity holds the event back from every client
       * subscribed with `waitFor="function"`. It must therefore be called even
       * when revalidation fails, or a broken website would stall live updates
       * for editors.
       */
      try {
        const response = await done(syncTags);
        if (!response.ok) {
          console.error(
            "Sanity invalidation done endpoint responded with HTTP",
            response.status,
          );
        }
      } catch (error) {
        console.error(
          "Error invoking Sanity invalidation done endpoint",
          error,
        );
      }
    }
  },
);

export { handler };
