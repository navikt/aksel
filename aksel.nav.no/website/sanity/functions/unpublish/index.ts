import { createClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";
import { getDraftId } from "@sanity/id-utils";
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
    await client
      .patch(getDraftId(data._id))
      .unset(["updateInfo"])
      .commit({ dryRun: local });
    console.info(
      local
        ? `(LOCAL TEST MODE - Content Lake not updated) Unset lastVerified timestamp for document (${data._id})`
        : `Unset lastVerified timestamp for document (${data._id})`,
    );
  } catch (error) {
    console.error("Error unsetting lastVerified timestamp:", error);
  }
});

export { handler };
