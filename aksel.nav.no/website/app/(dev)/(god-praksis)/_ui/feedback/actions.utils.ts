import { UsersLookupByEmailResponse, WebClient } from "@slack/web-api";
import NodeCache from "node-cache";
import "server-only";
import { logger } from "@navikt/next-logger";

const slackClient = new WebClient(process.env.SLACK_BOT_USER_TOKEN);

const slackUserCache = new NodeCache();

/**
 * Looks up a Slack user by email with caching
 */
async function lookupSlackUserByEmail(
  email: string,
): Promise<NonNullable<UsersLookupByEmailResponse["user"]> | null> {
  if (!email || !email.includes("@")) {
    return null;
  }

  const cachedUser = slackUserCache.get(email);
  if (cachedUser) {
    return cachedUser;
  }

  try {
    const response = await slackClient.users.lookupByEmail({ email });
    if (response.ok && response.user) {
      slackUserCache.set(email, response.user);
      return response.user;
    }
  } catch (error) {
    logger.error(`Error looking up Slack user by email ${email}: ${error}`);
  }

  return null;
}

export { lookupSlackUserByEmail };
