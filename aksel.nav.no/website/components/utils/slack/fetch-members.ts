import { UsersListResponse, WebClient } from "@slack/web-api";
import NodeCache from "node-cache";
import "server-only";

const cache = new NodeCache();
const CACHE_KEY = "slackMembers";

type SlackMembersSuccess = {
  ok: true;
  members: UsersListResponse["members"];
};

type SlackMembersError = {
  ok: false;
  error: string;
};

export async function fetchSlackMembers(): Promise<
  SlackMembersSuccess | SlackMembersError
> {
  // We fetch all slack members and cache them for 24h
  const slackMembers: SlackMembersSuccess = cache.get(CACHE_KEY);

  if (slackMembers) {
    return slackMembers;
  }

  const client = new WebClient(process.env.SLACK_BOT_TOKEN);

  let error: string;

  const slackUsers: UsersListResponse = await client.users
    .list({})
    .catch((e) => {
      error = e;
      return null;
    });

  if (slackUsers === null) {
    return { ok: false, error };
  }

  const result: SlackMembersSuccess = {
    ok: true,
    members: slackUsers.members ?? [],
  };

  cache.set(CACHE_KEY, result, 60 * 60 * 24);
  return result;
}
