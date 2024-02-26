import { UsersListResponse, WebClient } from "@slack/web-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { z } from "zod";
import { getClient } from "@/sanity/client.server";
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

type Member = {
  id: string;
  name: string;
};

const tempSender = {
  name: "Ola Normann",
  email: "Ola.Normann@nav.no",
};

/**
 * TODO:
 * - After merge of auth-PR, wrapp in withProtectedAPI for to make sure all calls are authenticated
 *
 */
export default async function sendSlackbotFeedback(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const validation = requestBodySchema.safeParse({ body: demoBody });

  if (validation.success === false) {
    logger.error(
      `Error when validating slackbot feedback: ${validation.error}`,
    );
    response.status(400).json({ message: validation.error });
    return;
  }

  const document = await getClient().fetch(
    groq`*[_id == $id][0]{
      "id": _id,
      "title": heading,
      "editors": contributors[]->email,
      "slug": slug.current
    }`,
    {
      id: validation.data.body.document_id,
    },
  );

  if (!document) {
    logger.error(
      `Error when fetching sanity document for slackbot feedback: ${validation.data.body.document_id}`,
    );
    response.status(400).json({ message: "No sanity-document found id" });
  }

  const slackUsers: UsersListResponse["members"] | null = await client.users
    .list({})
    .then((r) => (r.ok ? r.members ?? [] : []))
    .catch((e) => {
      logger.error(
        `Error extracting members from slack in slackbot feedback: ${e}`,
      );
      return null;
    });

  const senderSlackUser = slackUsers?.find(
    (m) => lowercase(m.profile?.email) === lowercase(tempSender.email),
  );

  let recievingUsers: Member[] | null = slackUsers
    .filter((m) =>
      document.editors.map(lowercase).includes(lowercase(m.profile?.email)),
    )
    .map((m) => ({
      id: m.id,
      name: m.name,
    }))
    .filter((m): m is Member => !!m.id);

  if (recievingUsers === null) {
    response.status(500);
    return;
  }

  if (recievingUsers.length === 0) {
    /**
     * TODO:
     * Update clientside that no editors were found and message was not sent
     */
    response.status(200).json({ message: "No editors found" });
    return;
  }

  /* response.status(200).json({ editors: emailToEditors, users: users });
  return; */

  recievingUsers = [recievingUsers[1]];
  for (const user of recievingUsers) {
    await client.chat.postMessage({
      channel: user.id,
      text: "Add fallback to this",
      metadata: {
        event_type: "aksel_article_feedback",
        event_payload: {
          name: tempSender.name,
          email: tempSender.email,
        },
      },
      blocks: slackBlock({
        article: {
          id: document.id,
          slug: document.slug,
          title: document.title,
        },
        feedback: validation.data.body.feedback,
        recievers: recievingUsers.map((x) => x.id),
        sender: validation.data.body.anon
          ? undefined
          : {
              email: senderSlackUser.profile.email,
              slackName: senderSlackUser.profile.display_name,
              slackId: senderSlackUser.id,
            },
      }),
    });
  }

  response.status(200).json({ success: "ok" });
  return;
}

function lowercase(str: string) {
  return str?.toLowerCase() ?? "";
}

type SlackBlockT = {
  feedback: string;
  article: { slug: string; title: string; id: string };
  recievers: string[];
  sender?: { email: string; slackName: string; slackId: string };
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
              ...(senderName.startsWith("@")
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
