import { SanitizedUser } from "./slack.types";

export function findUserByEmail(email: string, members: SanitizedUser[]) {
  return members?.find((m) => m.email?.toLowerCase() === email.toLowerCase());
}
