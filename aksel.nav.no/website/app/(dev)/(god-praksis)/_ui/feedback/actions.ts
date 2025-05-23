"use server";

import {
  SectionBlock,
  UsersLookupByEmailResponse,
  WebClient,
} from "@slack/web-api";
import { logger } from "@navikt/next-logger";
import { verifyUserLoggedIn } from "@/app/_auth/rcs";
import { client } from "@/app/_sanity/client";
import { DOCUMENT_BY_ID_FOR_SLACK_QUERY } from "@/app/_sanity/queries";
import { lookupSlackUserByEmail } from "./actions.utils";
import { zodFormDataSchema } from "./actions.zod";

type FormState =
  | { value: "sent"; error: string | null }
  | { value: "writing"; error: string | null }
  | { value: "error"; error: string };

const slackClient = new WebClient(process.env.SLACK_BOT_USER_TOKEN);

async function sendFeedbackAction(
  feedback: string,
  docId: string,
): Promise<{ value: "ok"; error: null } | { value: "error"; error: string }> {
  const authUser = await verifyUserLoggedIn();

  if (!authUser.ok) {
    logger.error(
      "Feedback: User was is not logged in while trying to send feedback to slack",
    );
    return {
      value: "error",
      error: "Brukeren er ikke logget inn",
    };
  }

  const validatedFormData = zodFormDataSchema.safeParse({
    feedback,
    docId,
  });

  if (!validatedFormData.success) {
    logger.error(
      `Feedback: Validation error when sending feedback to slack: ${
        validatedFormData.error.flatten().fieldErrors
      }`,
    );
    return {
      value: "error",
      error:
        validatedFormData.error.flatten().fieldErrors.feedback?.join(",") ?? "",
    };
  }

  const sanityDocument = await client.fetch(DOCUMENT_BY_ID_FOR_SLACK_QUERY, {
    id: validatedFormData.data.docId,
  });

  if (!sanityDocument) {
    logger.error(
      `Feedback: Document with id ${validatedFormData.data.docId} not found in Sanity`,
    );
    return {
      value: "error",
      error: "Fant ikke dokumentet i Sanity",
    };
  }

  // Collect all emails to look up (auth user + editors)
  const emailsToLookup = [
    authUser.user.email,
    ...(sanityDocument.editors || []),
    ...(sanityDocument.contacts || []),
  ];

  // Remove duplicates
  const uniqueEmails = [...new Set(emailsToLookup)].filter(isNonNullable);

  // Lookup all users in parallel
  const slackUsers = await Promise.all(
    uniqueEmails.map((email) => lookupSlackUserByEmail(email)),
  );

  // Filter out null results and create a map for easy access
  const slackUserMap = new Map<
    string,
    NonNullable<UsersLookupByEmailResponse["user"]>
  >();

  slackUsers.forEach((user, index) => {
    if (user) {
      slackUserMap.set(uniqueEmails[index], user);
    }
  });

  if (slackUserMap.size === 0) {
    logger.error(`Feedback: No slack users found for emails.`);
    return {
      value: "error",
      error: "Fant ingen slack-brukere",
    };
  }

  const senderSlackUser = slackUserMap.get(authUser.user.email);

  const slackProfileForEditorsIds =
    sanityDocument.editors
      ?.filter(isNonNullable)
      .map((email) => slackUserMap.get(email))
      .filter(isNonNullable)
      .map((user) => user.id)
      .filter(isNonNullable) ?? [];

  const slackProfileForTemaContactsIds =
    sanityDocument.contacts
      ?.filter(isNonNullable)
      .map((email) => slackUserMap.get(email))
      .filter(isNonNullable)
      .map((user) => user.id)
      .filter(isNonNullable) ?? [];

  const recieverSlackIdList = [
    ...new Set([
      ...slackProfileForEditorsIds,
      ...slackProfileForTemaContactsIds,
    ]),
  ];

  let postMessageError = false;

  await slackClient.chat
    .postMessage({
      /* ChannelId for #aksel-feedback-bot */
      channel: "C06PY34NNJH",
      text: `Tilbakemelding: ${validatedFormData.data.feedback}`,
      blocks: [
        ...slackBlock({
          article: {
            id: sanityDocument.id,
            slug: sanityDocument.slug ?? "",
            title: sanityDocument.title ?? "",
          },
          feedback: validatedFormData.data.feedback,
          recievers: recieverSlackIdList,
          sender: {
            email: authUser.user.email,
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
        `Feedback: Error when sending slackbot feedback to private channel: ${e}`,
      );
    });

  for (const slackId of recieverSlackIdList) {
    await slackClient.chat
      .postMessage({
        channel: slackId,
        text: `Tilbakemelding: ${validatedFormData.data.feedback}`,
        blocks: slackBlock({
          article: {
            id: sanityDocument.id ?? "",
            slug: sanityDocument.slug ?? "",
            title: sanityDocument.title ?? "",
          },
          feedback: validatedFormData.data.feedback,
          recievers: recieverSlackIdList,
          sender: {
            email: authUser.user.email,
            slackId: senderSlackUser?.id,
          },
        }),
      })
      .catch((e) => {
        postMessageError = true;
        logger.error(
          `Feedback: Error when sending slackbot feedback to private channel: ${e}`,
        );
      });
  }

  if (postMessageError) {
    return {
      value: "error",
      error: "Feil ved sending av tilbakemelding til slack",
    };
  }

  return { value: "ok", error: null };
}

function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
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

export { sendFeedbackAction };
export type { FormState };
