import { UsersListResponse } from "@slack/web-api";

export function findUserByEmail(
  email: string,
  members: UsersListResponse["members"],
) {
  return members?.find(
    (m) => m.profile?.email?.toLowerCase() === email.toLowerCase(),
  );
}
