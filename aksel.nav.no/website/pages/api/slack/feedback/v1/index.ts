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

const maxFeedbackLength = 500;

const requestBodySchema = z.object({
  body: z.object({
    feedback: z
      .string({
        required_error: "Message-string is required",
      })
      .min(1, "Message-string cannot be empty")
      .max(
        maxFeedbackLength,
        `Message-string cannot be longer than ${maxFeedbackLength} characters`,
      ),
    document_id: z.string({
      required_error: "Document-id is required",
    }),
  }),
});

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

export default authProtectedApi(sendSlackbotFeedback);

async function sendSlackbotFeedback(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  logger.info("Received slackbot feedback request");
  const user = getAuthUser(request.headers);

  /**
   * If authenticated user is not found, we return 400.
   * This should in theory no be possible since api is behind `authProtectedApi`
   */
  if (!user) {
    return errorResponse(response, SlackFeedbackError.InvalidUser);
  }

  /**
   * Validate the request with zod before we continue flow
   */
  const validation = requestBodySchema.safeParse({
    body: request.body,
  });
  if (validation.success === false) {
    return errorResponse(response, SlackFeedbackError.InvalidBody);
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
    return errorResponse(response, SlackFeedbackError.InvalidId);
  }

  const slackMembers = await fetchSlackMembers();
  if (slackMembers.ok === false) {
    return errorResponse(response, SlackFeedbackError.NoSlackUsers);
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

  let postMessageError = false;

  await client.chat
    .postMessage({
      channel: "C06P3E0P5FH",
      text: `Tilbakemelding: ${validation.data.body.feedback}`,
      blocks: [
        ...slackBlock({
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
            slackId: senderSlackUser?.id,
          },
        }),
        ...(slackProfileForEditors.length === 0
          ? [
              {
                type: "section",
                // @ts-expect-error might be fixed in future TS version? should be a good type
                text: {
                  type: "mrkdwn",
                  text: ":exclamation: Denne artikkelen har ingen redaktører. @here",
                },
              },
            ]
          : []),
      ],
    })
    .catch((e) => {
      postMessageError = true;
      logger.error(
        `Error when sending slackbot feedback to private channel: ${e}`,
      );
    });

  for (const editor of slackProfileForEditors) {
    if (!editor.id) {
      continue;
    }
    await client.chat
      .postMessage({
        channel: editor.id,
        text: `Tilbakemelding: ${validation.data.body.feedback}`,
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
          sender: {
            email: user.email,
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
    return errorResponse(response, SlackFeedbackError.PostMessageError);
  }

  response.status(200).json(responseJson(true));
  return;
}

const ErrorMap = {
  [SlackFeedbackError.InvalidUser]: `Error with getAuthUser in slackbot feedback. This should not happend since we are using authProtectedApi`,
  [SlackFeedbackError.InvalidBody]: `Error with validation of body in slackbot feedback`,
  [SlackFeedbackError.InvalidId]: `Error when fetching sanity document for slackbot feedback`,
  [SlackFeedbackError.NoSlackUsers]: `Error extracting members from slack in slackbot feedback`,
  [SlackFeedbackError.PostMessageError]: `Error when sending slackbot feedback to private channel or user in slackbot feedback`,
};

function errorResponse(
  response: NextApiResponse,
  error: keyof typeof ErrorMap,
) {
  logger.error(ErrorMap[error]);

  response.status(400).json(responseJson(false, error));
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
  feedback: string;
  article: { slug: string; title: string; id: string };
  recievers: string[];
  sender: { email: string; slackId?: string };
};

function slackBlock({ feedback, article, recievers, sender }: SlackBlockT) {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        /* TODO: Endre melding basert på om du er editor eller temakontakt */
        text: "Innspill til Aksel-artikkel du har medvirket til",
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
              ...(sender.slackId
                ? { type: "user", user_id: sender.slackId }
                : { type: "text", text: sender.email }),
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
