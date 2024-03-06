import { UsersListResponse, WebClient } from "@slack/web-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { authProtectedApi } from "@/auth/authProtectedApi";
import { getAuthUser } from "@/auth/getAuthUser";
import { getClient } from "@/sanity/client.server";
import {
  SlackFeedbackError,
  SlackFeedbackErrorT,
  SlackFeedbackResponse,
  fetchSlackMembers,
  findUserByEmail,
} from "@/slack";
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

/* const demoBody = {
  feedback: "Dette er en test",
  anon: true,
  document_id:
    "d0b2ca93-433b-4fcc-ab3c-c9c7d4dec186"
}; */

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

export default authProtectedApi(sendSlackbotFeedback);

async function sendSlackbotFeedback(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const user = getAuthUser(request.headers);

  /**
   * If authenticated user is not found, we return 400.
   * This should in theory no be possible since api is behind `authProtectedApi`
   */
  if (!user) {
    logger.error(
      `Error with getAuthUser in slackbot feedback. This should not happend since we are using authProtectedApi`,
    );
    response
      .status(400)
      .json(responseJson(false, SlackFeedbackError.InvalidUser));
    return;
  }

  /**
   * Validate the request with zod before we continue flow
   */
  console.log({ body: request.body });
  const validation = requestBodySchema.safeParse({
    body: request.body,
  });
  if (validation.success === false) {
    logger.error(
      `Error when validating slackbot feedback: ${validation.error}`,
    );
    response
      .status(400)
      .json(responseJson(false, SlackFeedbackError.InvalidBody));

    return;
  }

  /**
   * Sanity caches requests with cdn, so no need to cache locally
   */
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

  /**
   * If no document is found, sanity will return `null`
   */
  if (!document) {
    logger.error(
      `Error when fetching sanity document for slackbot feedback: ${validation.data.body.document_id}`,
    );
    response
      .status(400)
      .json(responseJson(false, SlackFeedbackError.InvalidId));
  }

  const slackMembers = await fetchSlackMembers();
  if (slackMembers.ok === false) {
    logger.error(
      `Error extracting members from slack in slackbot feedback: ${slackMembers.error}`,
    );
    response
      .status(400)
      .json(responseJson(false, SlackFeedbackError.NoSlackUsers));
    return;
  }

  /**
   * We find the sender in list of slack members
   * Since everyone in NAV has access to login,
   * but might not use slack we can have some cases where no user is found
   */
  const senderSlackUser = findUserByEmail(user.email, slackMembers.members);

  /**
   * We use contributors found on article and find their matching slack profiles
   */
  const slackProfileForEditors = document.editors
    .filter(Boolean)
    .map((email: string) => findUserByEmail(email, slackMembers.members))
    .filter(Boolean) as Exclude<UsersListResponse["members"], undefined>;

  if (slackProfileForEditors.length === 0) {
    response
      .status(200)
      .json(responseJson(false, SlackFeedbackError.NoEditors));
    return;
  }

  let postMessageError = false;

  for (const editor of slackProfileForEditors) {
    if (!editor.id) {
      continue;
    }
    await client.chat
      .postMessage({
        channel: editor.id,
        text: `Tilbakemelding: ${validation.data.body.feedback}`,
        metadata: {
          event_type: "aksel_article_feedback",
          event_payload: {
            name: user.name,
            email: user.email,
          },
        },
        blocks: slackBlock({
          isAnonymous: validation.data.body.anon,
          article: {
            id: document.id,
            slug: document.slug,
            title: document.title,
          },
          feedback: validation.data.body.feedback,
          recievers: slackProfileForEditors
            .map((x) => x.id)
            .filter(Boolean) as string[],
          sender: {
            email: user.email,
            slackName: senderSlackUser?.profile?.display_name,
            slackId: senderSlackUser?.id,
          },
        }),
      })
      .catch((e) => {
        postMessageError = true;
        logger.error(`Error when sending slackbot feedback: ${e}`);
      });
  }

  if (postMessageError) {
    response
      .status(400)
      .json(responseJson(false, SlackFeedbackError.PostMessageError));
  }

  response.status(200).json(responseJson(true));
  return;
}

function responseJson(
  valid: boolean,
  message?: SlackFeedbackErrorT,
): SlackFeedbackResponse {
  if (!valid && message) {
    return { ok: false, error: message };
  }
  return { ok: true };
}

type SlackBlockT = {
  isAnonymous: boolean;
  feedback: string;
  article: { slug: string; title: string; id: string };
  recievers: string[];
  sender: { email: string; slackName?: string; slackId?: string };
};

function slackBlock({
  isAnonymous,
  feedback,
  article,
  recievers,
  sender,
}: SlackBlockT) {
  const senderName = isAnonymous ? "Anonym tilbakemelding" : sender.email;
  const useSlackId = !!(sender.slackName && sender.slackId);

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
              ...(useSlackId
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
              text: "\n\nMedvirkende (disse fikk tilbakemeldingen):\n",
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
