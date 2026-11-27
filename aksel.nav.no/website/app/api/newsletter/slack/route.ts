import { fetchSecretQuery } from "@sanity/preview-url-secret/constants";
import { WebClient } from "@slack/web-api";
import { newsletterPayloadSchema } from "aksel-sanity-studio/newsletter-schema";
import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@navikt/next-logger";
import { client } from "@/app/_sanity/client";

// this might have to be an env variable. todo: change to permanent channel if we land this
const NEWSLETTER_CHANNEL_ID = "C0CM7HFLAJV";

const slackClient = new WebClient(process.env.SLACK_BOT_USER_TOKEN);

// Only Contributors or above can create the secret (see PostToSlackButton).
const isValidStudioSecret = async (secret: string) =>
  !!(await client
    .withConfig({ useCdn: false, perspective: "raw" }) // the secret is a draft document
    .fetch(fetchSecretQuery, { secret }, { cache: "no-store" }));

/**
 * Posts the newsletter from the "Nyhetsbrev til Slack" (admin pane) in Sanity Studio to Slack.
 * Expects `text` in standard markdown and the secret
 */
export async function POST(req: NextRequest) {
  const payload = newsletterPayloadSchema.safeParse(
    await req.json().catch(() => null),
  );

  if (!payload.success) {
    return NextResponse.json({ error: "invalid-payload" }, { status: 400 });
  }

  if (!(await isValidStudioSecret(payload.data.secret))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    await slackClient.chat.postMessage({
      channel: NEWSLETTER_CHANNEL_ID,
      markdown_text: payload.data.text,
      unfurl_links: false,
      unfurl_media: false,
    });
  } catch (error) {
    logger.error(`Newsletter: Error when posting to Slack: ${error}`);
    return NextResponse.json({ error: "slack-error" }, { status: 502 });
  }

  logger.info("Newsletter posted to Slack");
  return NextResponse.json({ ok: true });
}
