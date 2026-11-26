import { WebClient } from "@slack/web-api";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@navikt/next-logger";
import { verifyUserLoggedIn } from "@/app/_auth/rcs";

// this might have to be an env variable. todo: change to permanent channel if we land this
const NEWSLETTER_CHANNEL_ID = "C0CM7HFLAJV";

const slackClient = new WebClient(process.env.SLACK_BOT_USER_TOKEN);

// slack truncates messages longer than 40 000 characters
const payloadSchema = z.object({ text: z.string().trim().min(1).max(40000) });

/**
 * Posts the newsletter from the "Nyhetsbrev til Slack" (admin pane) in Sanity Studio to Slack.
 * Expects `text` in Slack mrkdwn (see `toSlackMrkdwn` in the Studio).
 */
export async function POST(req: NextRequest) {
  const authUser = await verifyUserLoggedIn();

  if (!authUser.ok) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const payload = payloadSchema.safeParse(await req.json().catch(() => null));

  if (!payload.success) {
    return NextResponse.json({ error: "invalid-payload" }, { status: 400 });
  }

  try {
    await slackClient.chat.postMessage({
      channel: NEWSLETTER_CHANNEL_ID,
      text: payload.data.text,
      unfurl_links: false,
      unfurl_media: false,
    });
  } catch (error) {
    logger.error(
      `Newsletter: Error when posting to Slack (by ${authUser.user.email}): ${error}`,
    );
    return NextResponse.json({ error: "slack-error" }, { status: 502 });
  }

  logger.info(`Newsletter: Posted to Slack by ${authUser.user.email}`);
  return NextResponse.json({ ok: true });
}
