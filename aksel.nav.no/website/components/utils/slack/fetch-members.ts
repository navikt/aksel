import { UsersListResponse, WebClient } from "@slack/web-api";
import "server-only";

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

  return { ok: true, members: slackUsers.members ?? [] };
}
