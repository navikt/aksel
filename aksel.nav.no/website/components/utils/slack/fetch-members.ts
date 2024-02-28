import { UsersListResponse, WebClient } from "@slack/web-api";
import NodeCache from "node-cache";
import "server-only";

const cache = new NodeCache();
const CACHE_KEY = "slackMembers";

type SlackMembersSuccess = {
  ok: true;
  members: Exclude<UsersListResponse["members"], undefined>;
};

type SlackMembersError = {
  ok: false;
  error: string;
};

export async function fetchSlackMembers(): Promise<
  SlackMembersSuccess | SlackMembersError
> {
  // We fetch all slack members and cache them for 24h
  const slackMembers: SlackMembersSuccess["members"] | undefined =
    cache.get(CACHE_KEY);

  if (slackMembers) {
    return {
      ok: true,
      members: slackMembers,
    };
  }

  const client = new WebClient(process.env.SLACK_BOT_TOKEN);

  const slackUsers = await client.users
    .list({})
    .then((r) => ({ result: r, ok: true as const }))
    .catch((e: string) => {
      return { error: e, ok: false as const };
    });

  if (slackUsers.ok === false) {
    return { ok: false, error: slackUsers.error };
  }

  if (!slackUsers.result.members) {
    return { ok: false, error: "No members found" };
  }

  const result: SlackMembersSuccess = {
    ok: true,
    members: slackUsers.result.members,
  };

  cache.set(CACHE_KEY, slackUsers.result.members, 60 * 60 * 24);
  return result;
}
