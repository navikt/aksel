import { UsersListResponse, WebClient } from "@slack/web-api";
import NodeCache from "node-cache";
import {
  FetchSlackMembersError,
  FetchSlackMembersSuccess,
  SanitizedUser,
} from "./slack.types";

const cache = new NodeCache();
const CACHE_KEY = "fetchslackMembers";

export async function fetchSlackMembers(): Promise<
  FetchSlackMembersSuccess | FetchSlackMembersError
> {
  const slackMembers: FetchSlackMembersSuccess["members"] | undefined =
    cache.get(CACHE_KEY);

  if (slackMembers) {
    return {
      ok: true,
      members: slackMembers,
    };
  }

  const client = new WebClient(process.env.SLACK_BOT_USER_TOKEN);

  const pagination: {
    limit: number;
    cursor: string | undefined;
    continue: boolean;
  } = {
    limit: 900,
    cursor: undefined,
    continue: true,
  };

  let members: Exclude<UsersListResponse["members"], undefined> = [];
  let error: string | undefined = undefined;

  while (pagination.continue) {
    const users = await client.users.list({
      cursor: pagination.cursor,
      limit: pagination.limit,
    });

    if (users.ok && users.members) {
      members = members.concat(users.members);
    } else {
      pagination.continue = false;
      error = users.error;
      break;
    }

    if (
      users.response_metadata?.next_cursor &&
      users.response_metadata?.next_cursor !== ""
    ) {
      pagination.cursor = users.response_metadata.next_cursor;
    } else {
      pagination.continue = false;
    }
  }

  if (error) {
    return {
      ok: false,
      error: error ?? "Error when paginating slack-users",
    };
  }

  /**
   * Lets filter out som unwanted users to simplify the list
   */
  const subset_members = members
    .filter((m) => !m.is_bot)
    .filter((m) => !m.deleted)
    .filter((m) => m.profile?.email)
    .filter((m) => m.id)
    .map((m) => ({
      id: m.id,
      email: m.profile?.email,
    })) as SanitizedUser[]; // TODO: perhaps not needed with newer TS version

  if (subset_members.length === 0) {
    return { ok: false, error: "No members found" };
  }

  cache.set(CACHE_KEY, subset_members, 60 * 60 * 24);

  return {
    ok: true,
    members: subset_members,
  };
}
