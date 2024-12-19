import { SectionBlock, UsersListResponse, WebClient } from "@slack/web-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { createChildLogger } from "@navikt/next-logger";
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

const client = new WebClient(process.env.SLACK_BOT_USER_TOKEN);

export default authProtectedApi(sendSlackbotFeedback);

type MembersArray = NonNullable<UsersListResponse["members"]>;
type Member = MembersArray[0] & {
  id: NonNullable<MembersArray[0]["id"]>;
};

async function sendSlackbotFeedback(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const logger = createChildLogger("slackbot-feedback");
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
      "slug": slug.current,
      "contacts": undertema[]->tema->contacts[]->email
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
   * Since everyone in Nav has access to login,
   * but might not use slack we can have some cases where no user is found
   */
  const senderSlackUser = findUserByEmail(user.email, slackMembers.members);

  /**
   * We use contributors found on article and find their matching slack profiles
   */
  const slackProfileForEditors = document.editors
    .filter(Boolean)
    .map((email: string) => findUserByEmail(email, slackMembers.members))
    .filter(Boolean)
    .filter((x) => !!x.id) as Member[];

  /**
   * We use contacts found on tema connected to article and find their matching slack profiles
   */
  const slackProfileForTemaContacts =
    (document.contacts
      ?.filter(Boolean)
      .map((email: string) => findUserByEmail(email, slackMembers.members))
      .filter(Boolean)
      .filter((x) => !!x.id) as Member[]) ?? [];

  /**
   * We want to make sure we avoid sending the message to the same user multiple times
   */
  const ids = [...slackProfileForEditors, ...slackProfileForTemaContacts].map(
    (member) => member.id,
  );

  const recieverSlackIdList = [...new Set(ids)];

  let postMessageError = false;

  await client.chat
    .postMessage({
      /* ChannelId for #aksel-feedback-bot */
      channel: "C06PY34NNJH",
      text: `Tilbakemelding: ${validation.data.body.feedback}`,
      blocks: [
        ...slackBlock({
          article: {
            id: document.id,
            slug: document.slug,
            title: document.title,
          },
          feedback: validation.data.body.feedback,
          recievers: recieverSlackIdList,
          sender: {
            email: user.email,
            slackId: senderSlackUser?.id,
          },
        }),
        ...(recieverSlackIdList.length === 0
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: ":exclamation: Denne artikkelen har ingen redaktører eller temakontater. @here",
                },
              } satisfies SectionBlock,
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

  for (const slackId of recieverSlackIdList) {
    await client.chat
      .postMessage({
        channel: slackId,
        text: `Tilbakemelding: ${validation.data.body.feedback}`,
        blocks: slackBlock({
          article: {
            id: document.id,
            slug: document.slug,
            title: document.title,
          },
          feedback: validation.data.body.feedback,
          recievers: recieverSlackIdList,
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
  const logger = createChildLogger("slackbot-feedback");
  logger.error(ErrorMap[error] ?? "unknown error");

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
          type: "rich_text_quote",
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
              text: "\n\nDisse fikk tilbakemeldingen (medvirkende og temakontakter):\n",
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
    {
      type: "divider",
    },
  ];
}
