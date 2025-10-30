"use server";

import { WebClient } from "@slack/web-api";
import { logger } from "@navikt/next-logger";
import { verifyUserLoggedIn } from "@/app/_auth/rcs";
import { client } from "@/app/_sanity/client";
import { DOCUMENT_BY_ID_FOR_SLACK_QUERY } from "@/app/_sanity/queries";
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
          recievers: [],
          sender: authUser.user.email,
        }),
      ],
    })
    .catch((e) => {
      postMessageError = true;
      logger.error(
        `Feedback: Error when sending slackbot feedback to private channel: ${e}`,
      );
    });

  if (postMessageError) {
    return {
      value: "error",
      error: "Feil ved sending av tilbakemelding til slack",
    };
  }

  return { value: "ok", error: null };
}

type SlackBlockT = {
  feedback: string;
  article: { slug: string; title: string; id: string };
  recievers: string[];
  sender: string;
};

function slackBlock({ feedback, article, sender }: SlackBlockT) {
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
            { type: "text", text: sender },
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
          ],
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
        url: `https://aksel.nav.no/admin/intent/edit/id=${article.id}`,
      },
    },
    {
      type: "divider",
    },
  ];
}

export { sendFeedbackAction };
export type { FormState };
