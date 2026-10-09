import { createClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";
import { format } from "date-fns/format";
import { SANITY_API_VERSION } from "../../sanity.env";

const NEWSLETTER_TODO_ID = "newsletter_todo";

const handler = documentEventHandler(async ({ context, event }) => {
  const client = createClient({
    ...context.clientOptions,
    apiVersion: SANITY_API_VERSION,
    useCdn: false,
  });
  const { data } = event;
  const { local } = context; // local is true when running locally

  try {
    const alreadyAdded = await client.fetch<boolean>(
      `count(*[_id == $todoId][0].todoList[articleRef._ref == $ref]) > 0`,
      { todoId: NEWSLETTER_TODO_ID, ref: data._id },
    );

    if (alreadyAdded) {
      console.info(
        `Document (${data._id}) already in ${NEWSLETTER_TODO_ID}, skipping`,
      );
      return;
    }

    await client
      .transaction()
      .createIfNotExists({
        _id: NEWSLETTER_TODO_ID,
        _type: NEWSLETTER_TODO_ID,
      })
      .patch(NEWSLETTER_TODO_ID, (patch) =>
        patch.setIfMissing({ todoList: [] }).append("todoList", [
          {
            _type: "inline",
            articleRef: { _type: "reference", _ref: data._id, _weak: true },
            dateAdded: format(new Date(), "yyyy-MM-dd"),
          },
        ]),
      )
      .commit({ autoGenerateArrayKeys: true, dryRun: local });

    console.info(
      local
        ? `(LOCAL TEST MODE - Content Lake not updated) Added document (${data._id}) to ${NEWSLETTER_TODO_ID}`
        : `Added document (${data._id}) to ${NEWSLETTER_TODO_ID}`,
    );
  } catch (error) {
    console.error(`Error adding document to ${NEWSLETTER_TODO_ID}:`, error);
  }
});

export { handler };
