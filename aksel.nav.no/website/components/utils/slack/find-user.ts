import type { SanitizedUser } from "./slack.types";

export function findUserByEmail(
  email: string,
  members: Partial<SanitizedUser>[],
) {
  return members?.find((m) => m.email?.toLowerCase() === email.toLowerCase());
}
