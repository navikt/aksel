import type { StructureBuilder } from "sanity/structure";

const ADMIN_ROLES = ["developer", "administrator"];

/**
 * Whether the current user is an administrator or developer. Used to gate
 * admin-only entries in the studio structure.
 */
export function isAdminOrDev(S: StructureBuilder) {
  return Boolean(
    S.context.currentUser?.roles.some((role) =>
      ADMIN_ROLES.includes(role.name),
    ),
  );
}
