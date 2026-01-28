import { WebClient } from "@slack/web-api";
import { NextRequest, NextResponse } from "next/server";
import "server-only";
import { z } from "zod";
import { logger } from "@navikt/next-logger";
import { verifyUserLoggedIn } from "@/app/_auth/rcs";
import { client } from "@/app/_sanity/client";
import { DOCUMENT_BY_ID_FOR_SLACK_QUERY } from "@/app/_sanity/queries";

const slackClient = new WebClient(process.env.SLACK_BOT_USER_TOKEN);

const zodFormDataSchema = z.object({
  feedback: z
    .string({ invalid_type_error: "Ugyldig melding" })
    .min(1, "Kan ikke send en tom tilbakemelding")
    .max(500, "Tilbakemeldingen må være under 500 tegn"),
  docId: z.string({ invalid_type_error: "Ugyldig dokument id" }),
});

export async function POST(request: NextRequest) {
  try {
    const { feedback, docId } = await request.json();

    const authUser = await verifyUserLoggedIn();

    if (!authUser.ok) {
      logger.error(
        "Feedback: User was is not logged in while trying to send feedback to slack",
      );
      return NextResponse.json(
        { error: "Brukeren er ikke logget inn" },
        { status: 401 },
      );
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

      return NextResponse.json(
        {
          error:
            validatedFormData.error.flatten().fieldErrors.feedback?.join(",") ??
            "Validation error",
        },
        { status: 400 },
      );
    }

    const sanityDocument = await client.fetch(DOCUMENT_BY_ID_FOR_SLACK_QUERY, {
      id: validatedFormData.data.docId,
    });

    if (!sanityDocument) {
      logger.error(
        `Feedback: Document with id ${validatedFormData.data.docId} not found in Sanity`,
      );
      return NextResponse.json(
        { error: "Fant ikke dokumentet i Sanity" },
        { status: 404 },
      );
    }

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
        logger.error(
          `Feedback: Error when sending slackbot feedback to private channel: ${e}`,
        );
        throw e;
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error(`Feedback: Unexpected error: ${error}`);
    return NextResponse.json(
      { error: "Feil ved sending av tilbakemelding til slack" },
      { status: 500 },
    );
  }
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
