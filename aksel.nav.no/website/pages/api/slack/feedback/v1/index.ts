import { UsersListResponse, WebClient } from "@slack/web-api";
import type { NextApiRequest, NextApiResponse } from "next";
import "server-only";
import { z } from "zod";
import { authProtectedApi } from "@/auth/authProtectedApi";
import { getAuthUser } from "@/auth/getAuthUser";
import { getClient } from "@/sanity/client.server";
import { fetchSlackMembers, findUserByEmail } from "@/slack";
import { logger } from "../../../../../config/logger";

const requestBodySchema = z.object({
  body: z.object({
    feedback: z.string({
      required_error: "Message-string is required",
    }),
    anon: z.boolean({
      required_error: "Anonymity-boolean is required",
    }),
    document_id: z.string({
      required_error: "Document-id is required",
    }),
  }),
});

const demoBody = {
  feedback: "Dette er en test",
  anon: true,
  document_id:
    "d0b2ca93-433b-4fcc-ab3c-c9c7d4dec186" /* <- https://aksel.nav.no/admin/prod/structure/komponenter;primitives;d0b2ca93-433b-4fcc-ab3c-c9c7d4dec186%2Cinspect%3Don */,
};

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

export default authProtectedApi(sendSlackbotFeedback);

/**
 * TODO:
 * - After merge of auth-PR, wrapp in withProtectedAPI for to make sure all calls are authenticated
 *
 */
async function sendSlackbotFeedback(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // First we validate the request with zod
  const validation = requestBodySchema.safeParse({ body: demoBody });
  if (validation.success === false) {
    logger.error(
      `Error when validating slackbot feedback: ${validation.error}`,
    );
    response.status(400).json({ message: validation.error });
    return;
  }

  const user = getAuthUser(request.headers);

  if (!user.email || !user.name) {
    logger.error(
      `Error with getAuthUser in slackbot feedback. This should not happend since we are using authProtectedApi`,
    );
    response.status(400).json({ message: "Invalid user" });
    return;
  }

  // Sanity already caches requests with cdn, so we don't need to do that here
  const document = await getClient().fetch(
    `*[_id == $id][0]{
      "id": _id,
      "title": heading,
      "editors": contributors[]->email,
      "slug": slug.current
    }`,
    {
      id: validation.data.body.document_id,
    },
  );

  // If id given in request is not found, we will return 400
  if (!document) {
    logger.error(
      `Error when fetching sanity document for slackbot feedback: ${validation.data.body.document_id}`,
    );
    response.status(400).json({ message: "No sanity-document found id" });
  }

  const slackMembers = await fetchSlackMembers();

  if (slackMembers.ok === false) {
    logger.error(
      `Error extracting members from slack in slackbot feedback: ${slackMembers.error}`,
    );
    response.status(400);
    return;
  }

  /**
   * We find the sender in list of slack members
   * Since everyone in NAV has access to login,
   * but might not use slack we canhave some cases where no user is found
   */
  const senderSlackUser = findUserByEmail(user.email, slackMembers.members);

  // TODO: Bugged, shoud not need to have a slack user to add mail
  const senderSlackData = senderSlackUser
    ? {
        email: user.email,
        slackName: senderSlackUser.profile?.display_name,
        slackId: senderSlackUser.id,
      }
    : { email: user.email };

  /**
   * We use contributors found on article and find their matching slack profiles
   */
  const slackProfileForEditors = document.editors
    .filter(Boolean)
    .map((email: string) => findUserByEmail(email, slackMembers.members))
    .filter(Boolean) as Exclude<UsersListResponse["members"], undefined>;

  if (slackProfileForEditors.length === 0) {
    /**
     * TODO:
     * Update clientside that no editors were found and message was not sent
     */
    response.status(200).json({ message: "No editors found" });
    return;
  }

  for (const editor of slackProfileForEditors) {
    if (!editor.id) {
      continue;
    }
    await client.chat.postMessage({
      channel: editor.id,
      text: "Add fallback to this",
      metadata: {
        event_type: "aksel_article_feedback",
        event_payload: {
          name: user.name,
          email: user.email,
        },
      },
      blocks: slackBlock({
        article: {
          id: document.id,
          slug: document.slug,
          title: document.title,
        },
        feedback: validation.data.body.feedback,
        recievers: slackProfileForEditors
          .map((x) => x.id)
          .filter(Boolean) as string[],
        sender: validation.data.body.anon ? undefined : senderSlackData,
      }),
    });
  }

  response.status(200).json({ success: "ok" });
  return;
}

type SlackBlockT = {
  feedback: string;
  article: { slug: string; title: string; id: string };
  recievers: string[];
  sender?: { email: string; slackName?: string; slackId?: string };
};

function slackBlock({ feedback, article, recievers, sender }: SlackBlockT) {
  const senderName = !sender
    ? "Anonym"
    : sender.slackName
      ? `@${sender.slackName}`
      : sender.email;

  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Innspill til Aksel-artikkel",
        emoji: true,
      },
    },

    {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: `\n${feedback}\n\n`,
            },
          ],
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "rich_text",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            {
              type: "text",
              text: `Avsender:\n`,
              style: {
                bold: true,
              },
            },
            {
              ...(senderName.startsWith("@") && sender?.slackId
                ? { type: "user", user_id: sender.slackId }
                : { type: "text", text: senderName }),
            },
            {
              type: "text",
              text: "\n\nArtikkel:\n",
              style: {
                bold: true,
              },
            },
            {
              type: "link",
              url: `https://aksel.nav.no/${article.slug}`,
              text: `${article.title}\n\n`,
            },
            {
              type: "text",
              text: "\n\nMedvirkende:\n",
              style: {
                bold: true,
              },
            },
          ],
        },
        {
          type: "rich_text_list",
          style: "bullet",
          indent: 0,
          border: 0,
          elements: recievers.map((reciever) => ({
            type: "rich_text_section",
            elements: [{ type: "user", user_id: reciever }],
          })),
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Rediger artikkel ",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: ":pencil2: Rediger",
          emoji: true,
        },
        url: `https://aksel.nav.no/admin/prod/intent/edit/id=${article.id}`,
      },
    },
  ];
}
