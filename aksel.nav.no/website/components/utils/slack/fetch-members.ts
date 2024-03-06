import { UsersListResponse, WebClient } from "@slack/web-api";
import NodeCache from "node-cache";
import {
  FetchSlackMembersError,
  FetchSlackMembersSuccess,
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

  const client = new WebClient(process.env.SLACK_BOT_TOKEN);

  const pagination: {
    limit: number;
    cursor: string | undefined;
    continue: boolean;
  } = {
    limit: 200,
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
  members = members
    .filter((m) => !m.is_bot)
    .filter((m) => !m.deleted)
    .filter((m) => !!m.is_email_confirmed);

  if (members.length === 0) {
    return { ok: false, error: "No members found" };
  }

  cache.set(CACHE_KEY, members, 60 * 60 * 24);

  return {
    ok: true,
    members,
  };
}
