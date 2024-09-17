import merge from "lodash.merge";
import { GlobalColorRoles, globalColorRoles } from "../util";

const configForRole = (role: GlobalColorRoles) => ({
  bg: {
    [role]: {
      value: `{a.${role}.100.value}`,
      type: "color",
    },
    [`${role}-moderate`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
    },
    [`${role}-moderate-hover`]: {
      value: `{a.${role}.300.value}`,
      type: "color",
    },
  },
});

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRoles = () =>
  globalColorRoles.reduce((acc, role) => merge(acc, configForRole(role)), {});
