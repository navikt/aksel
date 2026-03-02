import { createClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";
import { format } from "date-fns/format";
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
    const verifiedTimeStamp = format(new Date(), "yyyy-MM-dd");
    const result = await client
      .patch(data._id)
      .setIfMissing({
        updateInfo: {
          lastVerified: verifiedTimeStamp,
        },
      })
      .commit({ dryRun: local });
    console.info(
      local
        ? `(LOCAL TEST MODE - Content Lake not updated) Set lastVerified timestamp for document (${data._id}): ${verifiedTimeStamp}  `
        : `Set lastVerified timestamp for document (${data._id}): ${verifiedTimeStamp}`,
      result,
    );
  } catch (error) {
    console.error("Error setting lastVerified timestamp:", error);
  }
});

export { handler };
