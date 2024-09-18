import _ from "lodash";
import { GlobalColorRoles, globalColorRoles } from "../util";

const configForRole = (role: GlobalColorRoles) => ({
  bg: {
    [role]: {
      value: `{a.${role}.100.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-hover`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
      group: `background.${role}`,
    },
    /**
     * TODO: Consider a role-selected token
     * - For static selected elements like links, combobox ++
     * - Might just be static bg-selected
     */
    [`${role}-moderate`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-moderate-hover`]: {
      value: `{a.${role}.300.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-moderate-active`]: {
      value: `{a.${role}.400.value}`,
      type: "color",
      group: `background.${role}`,
    },
    /* Should match role-strong */
    [`${role}-moderate-selected`]: {
      value: `{a.${role}.700.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-strong`]: {
      value: `{a.${role}.700.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-strong-hover`]: {
      value: `{a.${role}.800.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-strong-active`]: {
      value: `{a.${role}.900.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-raised`]: {
      value: `{a.${role}.100.value}`,
      type: "color",
      group: `background.${role}`,
    },
    [`${role}-raised-hover`]: {
      value: `{a.${role}.200.value}`,
      type: "color",
      group: `background.${role}`,
    },
  },
  text: {
    [role]: {
      value: `{a.${role}.1000.value}`,
      type: "color",
      group: `text.${role}`,
    },
    [`${role}-subtle`]: {
      value: `{a.${role}.900.value}`,
      type: "color",
      group: `text.${role}`,
    },
    [`${role}-icon`]: {
      value: `{a.${role}.600.value}`,
      type: "color",
      group: `text.${role}`,
    },
  },
  border: {
    [role]: {
      value: `{a.${role}.500.value}`,
      type: "color",
      group: `border.${role}`,
    },
    [`${role}-subtle`]: {
      value: `{a.${role}.400.value}`,
      type: "color",
      group: `border.${role}`,
    },
    [`${role}-strong`]: {
      value: `{a.${role}.600.value}`,
      type: "color",
      group: `border.${role}`,
    },
  },
});

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const semanticTokensForAllRolesConfig = () =>
  globalColorRoles.reduce(
    (acc, role) => _.merge(acc, configForRole(role)),
    {} as ReturnType<typeof configForRole>,
  );
